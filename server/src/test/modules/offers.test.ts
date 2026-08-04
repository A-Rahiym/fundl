import { authedApi } from "../helpers/testClient";
import { createTestUser, createTestCategory, createTestJob } from "../helpers/factories";
import { prisma } from "@/lib/prisma";

describe("Offers endpoints", () => {
  it("POST /jobs/:id/offers lets an artisan offer on an open job", async () => {
    const client = await createTestUser({ role: "client" });
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const res = await authedApi(artisan.id, "artisan").post(`/api/v1/jobs/${job.id}/offers`).send({
      price: 15000,
      message: "Can do this Thursday",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.price).toBe("15000");
  });

  it("POST /jobs/:id/offers rejects a client account", async () => {
    const client = await createTestUser({ role: "client" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const res = await authedApi(client.id, "client").post(`/api/v1/jobs/${job.id}/offers`).send({ price: 1000 });

    expect(res.status).toBe(403);
  });

  it("POST /jobs/:id/offers rejects a duplicate offer", async () => {
    const client = await createTestUser({ role: "client" });
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const first = await authedApi(artisan.id, "artisan").post(`/api/v1/jobs/${job.id}/offers`).send({ price: 15000 });
    expect(first.status).toBe(201);

    const second = await authedApi(artisan.id, "artisan").post(`/api/v1/jobs/${job.id}/offers`).send({ price: 14000 });

    expect(second.status).toBe(409);
  });

  it("GET /jobs/:id/offers is owner only", async () => {
    const client = await createTestUser({ role: "client" });
    const otherClient = await createTestUser({ role: "client" });
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);
    await prisma.offer.create({ data: { jobId: job.id, artisanId: artisan.id, price: 10000 } });

    const res = await authedApi(otherClient.id, "client").get(`/api/v1/jobs/${job.id}/offers`);

    expect(res.status).toBe(403);
  });

  it("PUT /offers/:id/accept accepts one offer and declines the rest", async () => {
    const client = await createTestUser({ role: "client" });
    const artisan1 = await createTestUser({ role: "artisan" });
    const artisan2 = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const offer1Res = await authedApi(artisan1.id, "artisan")
      .post(`/api/v1/jobs/${job.id}/offers`)
      .send({ price: 10000 });
    const offer2Res = await authedApi(artisan2.id, "artisan")
      .post(`/api/v1/jobs/${job.id}/offers`)
      .send({ price: 12000 });

    const res = await authedApi(client.id, "client").put(`/api/v1/offers/${offer1Res.body.data.id}/accept`);

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("accepted");

    const updatedJob = await prisma.job.findUnique({ where: { id: job.id } });
    expect(updatedJob!.status).toBe("in_progress");
    expect(updatedJob!.acceptedOfferId).toBe(offer1Res.body.data.id);

    const declined = await prisma.offer.findUnique({ where: { id: offer2Res.body.data.id } });
    expect(declined!.status).toBe("declined");
  });

  it("PUT /offers/:id/decline declines a pending offer", async () => {
    const client = await createTestUser({ role: "client" });
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const offerRes = await authedApi(artisan.id, "artisan").post(`/api/v1/jobs/${job.id}/offers`).send({ price: 9000 });

    const res = await authedApi(client.id, "client").put(`/api/v1/offers/${offerRes.body.data.id}/decline`);

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("declined");
  });

  it("GET /offers/mine returns the artisan's sent offers", async () => {
    const client = await createTestUser({ role: "client" });
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);
    await authedApi(artisan.id, "artisan").post(`/api/v1/jobs/${job.id}/offers`).send({ price: 8000 });

    const res = await authedApi(artisan.id, "artisan").get("/api/v1/offers/mine");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].job.id).toBe(job.id);
  });
});
