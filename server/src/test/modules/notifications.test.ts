import { authedApi } from "../helpers/testClient";
import { createTestUser, createTestCategory, createTestJob } from "../helpers/factories";

async function jobWithOffer() {
  const client = await createTestUser({ role: "client" });
  const artisan = await createTestUser({ role: "artisan" });
  const category = await createTestCategory();
  const job = await createTestJob(client.id, category.id);
  return {
    client,
    artisan,
    job,
    clientApi: authedApi(client.id, "client"),
    artisanApi: authedApi(artisan.id, "artisan"),
  };
}

describe("Notifications endpoints", () => {
  it("notifies the client when an artisan offers", async () => {
    const { client, job, artisanApi } = await jobWithOffer();

    await artisanApi.post(`/api/v1/jobs/${job.id}/offers`).send({ price: 12000 });

    const res = await authedApi(client.id, "client").get("/api/v1/notifications");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].type).toBe("offer.received");
    expect(res.body.data[0].isRead).toBe(false);
    expect(res.body.data[0].payload.jobId).toBe(job.id);
  });

  it("notifies the artisan on accept, decline and completion", async () => {
    const { artisan, job, clientApi } = await jobWithOffer();
    const artisanApi = authedApi(artisan.id, "artisan");

    const offerRes = await artisanApi.post(`/api/v1/jobs/${job.id}/offers`).send({ price: 12000 });
    const offerId = offerRes.body.data.id as string;

    await clientApi.put(`/api/v1/offers/${offerId}/accept`);
    await clientApi.put(`/api/v1/jobs/${job.id}/complete`);

    const res = await artisanApi.get("/api/v1/notifications");
    const types = (res.body.data as Array<{ type: string }>).map((n) => n.type);

    expect(res.status).toBe(200);
    expect(types).toContain("offer.accepted");
    expect(types).toContain("job.completed");
  });

  it("notifies the artisan on decline", async () => {
    const { job, clientApi, artisanApi } = await jobWithOffer();

    const offerRes = await artisanApi.post(`/api/v1/jobs/${job.id}/offers`).send({ price: 12000 });
    await clientApi.put(`/api/v1/offers/${offerRes.body.data.id}/decline`);

    const res = await artisanApi.get("/api/v1/notifications");
    const types = (res.body.data as Array<{ type: string }>).map((n) => n.type);

    expect(types).toContain("offer.declined");
  });

  it("only shows a user's own notifications", async () => {
    const { job, artisanApi } = await jobWithOffer();
    const stranger = await createTestUser({ role: "client" });

    await artisanApi.post(`/api/v1/jobs/${job.id}/offers`).send({ price: 12000 });

    const res = await authedApi(stranger.id, "client").get("/api/v1/notifications");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("PUT /notifications/:id/read marks a notification read", async () => {
    const { client, job, artisanApi } = await jobWithOffer();

    await artisanApi.post(`/api/v1/jobs/${job.id}/offers`).send({ price: 12000 });
    const clientApi = authedApi(client.id, "client");
    const list = await clientApi.get("/api/v1/notifications");
    const id = list.body.data[0].id as string;

    const res = await clientApi.put(`/api/v1/notifications/${id}/read`);

    expect(res.status).toBe(200);
    expect(res.body.data.isRead).toBe(true);
  });

  it("PUT /notifications/:id/read 404s unknown and 403s foreign rows", async () => {
    const { client, job, artisanApi } = await jobWithOffer();
    const stranger = await createTestUser({ role: "client" });
    const clientApi = authedApi(client.id, "client");

    await artisanApi.post(`/api/v1/jobs/${job.id}/offers`).send({ price: 12000 });
    const list = await clientApi.get("/api/v1/notifications");
    const id = list.body.data[0].id as string;

    const missing = await clientApi.put("/api/v1/notifications/00000000-0000-0000-0000-000000000000/read");
    expect(missing.status).toBe(404);

    const foreign = await authedApi(stranger.id, "client").put(`/api/v1/notifications/${id}/read`);
    expect(foreign.status).toBe(403);
  });
});
