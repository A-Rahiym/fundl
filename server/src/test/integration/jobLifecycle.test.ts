import { authedApi } from "../helpers/testClient";
import { createTestUser, createTestCategory } from "../helpers/factories";

describe("Full job lifecycle", () => {
  it("takes a job from posted to completed", async () => {
    const client = await createTestUser({ role: "client" });
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const clientApi = authedApi(client.id, "client");
    const artisanApi = authedApi(artisan.id, "artisan");

    // 1. Client posts a job
    const jobRes = await clientApi.post("/api/v1/jobs").send({
      title: "Rewire living room",
      description: "Need an electrician to rewire two sockets",
      categoryKey: category.key,
    });
    expect(jobRes.status).toBe(201);
    const jobId = jobRes.body.data.id;

    // 2. Artisan sends an offer
    const offerRes = await artisanApi.post(`/api/v1/jobs/${jobId}/offers`).send({
      price: 15000,
      message: "Can do this Thursday",
    });
    expect(offerRes.status).toBe(201);
    const offerId = offerRes.body.data.id;

    // 3. Client accepts the offer
    const acceptRes = await clientApi.put(`/api/v1/offers/${offerId}/accept`);
    expect(acceptRes.status).toBe(200);
    expect(acceptRes.body.data.status).toBe("accepted");

    // 4. Client marks the job complete
    const completeRes = await clientApi.put(`/api/v1/jobs/${jobId}/complete`);
    expect(completeRes.status).toBe(200);
    expect(completeRes.body.data.status).toBe("completed");
  });
});
