import { authedApi } from "../helpers/testClient";
import { createTestUser, createTestCategory, createTestJob } from "../helpers/factories";
import { prisma } from "@/lib/prisma";

describe("Jobs endpoints", () => {
  it("POST /jobs creates a job for the authenticated client", async () => {
    const client = await createTestUser({ role: "client" });
    const category = await createTestCategory();

    const res = await authedApi(client.id, "client").post("/api/v1/jobs").send({
      title: "Fix kitchen sink",
      description: "Leaking pipe under the sink, needs urgent repair",
      categoryKey: category.key,
    });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe("open");
    expect(res.body.data.title).toBe("Fix kitchen sink");
  });

  it("POST /jobs rejects job creation from an artisan account", async () => {
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();

    const res = await authedApi(artisan.id, "artisan").post("/api/v1/jobs").send({
      title: "Fix kitchen sink",
      description: "Leaking pipe under the sink, needs urgent repair",
      categoryKey: category.key,
    });

    expect(res.status).toBe(403);
  });

  it("GET /jobs lists jobs", async () => {
    const client = await createTestUser({ role: "client" });
    const category = await createTestCategory();
    await createTestJob(client.id, category.id);

    const res = await authedApi(client.id, "client").get("/api/v1/jobs");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("GET /jobs filters by category", async () => {
    const carpentry = await prisma.category.create({ data: { key: "carpentry", icon: "hammer" } });
    const plumbing = await prisma.category.create({ data: { key: "plumbing", icon: "wrench" } });
    const client = await createTestUser({ role: "client" });
    await createTestJob(client.id, carpentry.id);
    await createTestJob(client.id, plumbing.id);

    const res = await authedApi(client.id, "client").get("/api/v1/jobs?category=carpentry");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].category.key).toBe("carpentry");
  });

  it("GET /jobs/:id hides offers from non-owners", async () => {
    const client = await createTestUser({ role: "client" });
    const otherClient = await createTestUser({ role: "client" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const res = await authedApi(otherClient.id, "client").get(`/api/v1/jobs/${job.id}`);

    expect(res.status).toBe(200);
    expect(res.body.data.offers).toEqual([]);
  });

  it("GET /jobs/mine returns only the client's own jobs", async () => {
    const client = await createTestUser({ role: "client" });
    const other = await createTestUser({ role: "client" });
    const category = await createTestCategory();
    await createTestJob(client.id, category.id);
    await createTestJob(other.id, category.id);

    const res = await authedApi(client.id, "client").get("/api/v1/jobs/mine");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("PUT /jobs/:id updates an open job owned by the client", async () => {
    const client = await createTestUser({ role: "client" });
    const category = await createTestCategory();
    const job = await createTestJob(client.id, category.id);

    const res = await authedApi(client.id, "client")
      .put(`/api/v1/jobs/${job.id}`)
      .send({ title: "Updated title here" });

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("Updated title here");
  });

  it("PUT /jobs/:id/complete completes an in-progress job", async () => {
    const client = await createTestUser({ role: "client" });
    const category = await createTestCategory();
    const job = await prisma.job.create({
      data: {
        clientId: client.id,
        categoryId: category.id,
        title: "In progress job",
        description: "Active work happening right now",
        status: "in_progress",
      },
    });

    const res = await authedApi(client.id, "client").put(`/api/v1/jobs/${job.id}/complete`);

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("completed");
  });
});
