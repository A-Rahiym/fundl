import { authedApi } from "../helpers/testClient";
import { createTestUser, createTestCategory, createTestJob } from "../helpers/factories";
import { prisma } from "../../lib/prisma";

async function completedJobWithOffer() {
  const client = await createTestUser({ role: "client" });
  const artisan = await createTestUser({ role: "artisan" });
  const category = await createTestCategory();
  await prisma.artisanProfile.create({
    data: { userId: artisan.id, categoryId: category.id, rateType: "fixed", rateAmount: 20000 },
  });
  const job = await createTestJob(client.id, category.id);
  const clientApi = authedApi(client.id, "client");
  const artisanApi = authedApi(artisan.id, "artisan");

  const offerRes = await artisanApi.post(`/api/v1/jobs/${job.id}/offers`).send({ price: 15000 });
  const offerId = offerRes.body.data.id as string;
  await clientApi.put(`/api/v1/offers/${offerId}/accept`);
  await clientApi.put(`/api/v1/jobs/${job.id}/complete`);

  return { client, artisan, category, job, clientApi, artisanApi, offerId };
}

describe("Reviews endpoints", () => {
  it("POST /jobs/:id/review creates a review and recomputes the artisan rating", async () => {
    const { artisan, job, clientApi } = await completedJobWithOffer();

    const res = await clientApi.post(`/api/v1/jobs/${job.id}/review`).send({
      rating: 5,
      comment: "Sharp sharp work",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.rating).toBe(5);
    expect(res.body.data.reviewer.id).toBeDefined();
    expect(res.body.data.job.id).toBe(job.id);

    const profile = await prisma.artisanProfile.findUnique({ where: { userId: artisan.id } });
    expect(Number(profile?.avgRating)).toBe(5);
    expect(profile?.reviewCount).toBe(1);
  });

  it("POST /jobs/:id/review rejects a non-completed job", async () => {
    const client = await createTestUser({ role: "client" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const res = await authedApi(client.id, "client")
      .post(`/api/v1/jobs/${job.id}/review`)
      .send({ rating: 4 });

    expect(res.status).toBe(409);
  });

  it("POST /jobs/:id/review rejects a duplicate review", async () => {
    const { job, clientApi } = await completedJobWithOffer();

    const first = await clientApi.post(`/api/v1/jobs/${job.id}/review`).send({ rating: 5 });
    expect(first.status).toBe(201);

    const second = await clientApi.post(`/api/v1/jobs/${job.id}/review`).send({ rating: 3 });
    expect(second.status).toBe(409);
  });

  it("POST /jobs/:id/review rejects a non-owner", async () => {
    const { job } = await completedJobWithOffer();
    const stranger = await createTestUser({ role: "client" });

    const res = await authedApi(stranger.id, "client")
      .post(`/api/v1/jobs/${job.id}/review`)
      .send({ rating: 5 });

    expect(res.status).toBe(403);
  });

  it("POST /jobs/:id/review rejects an out-of-range rating", async () => {
    const { job, clientApi } = await completedJobWithOffer();

    const res = await clientApi.post(`/api/v1/jobs/${job.id}/review`).send({ rating: 9 });

    expect(res.status).toBe(422);
  });

  it("GET /artisans/:id/reviews lists reviews with reviewer and job", async () => {
    const { artisan, job, clientApi } = await completedJobWithOffer();

    await clientApi.post(`/api/v1/jobs/${job.id}/review`).send({ rating: 4, comment: "Good" });

    const res = await clientApi.get(`/api/v1/artisans/${artisan.id}/reviews`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].rating).toBe(4);
    expect(res.body.data[0].reviewer.id).toBeDefined();
    expect(res.body.data[0].job.id).toBe(job.id);
  });

  it("GET /artisans/:id/reviews also accepts a profile id", async () => {
    const { artisan, job, clientApi } = await completedJobWithOffer();
    const profile = await prisma.artisanProfile.findUnique({ where: { userId: artisan.id } });
    expect(profile).not.toBeNull();

    await clientApi.post(`/api/v1/jobs/${job.id}/review`).send({ rating: 5 });

    const res = await clientApi.get(`/api/v1/artisans/${profile!.id}/reviews`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("GET /artisans/:id/reviews 404s for an unknown artisan", async () => {
    const client = await createTestUser({ role: "client" });

    const res = await authedApi(client.id, "client").get(
      "/api/v1/artisans/00000000-0000-0000-0000-000000000000/reviews",
    );

    expect(res.status).toBe(404);
  });
});
