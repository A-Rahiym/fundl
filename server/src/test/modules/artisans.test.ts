import { authedApi } from "../helpers/testClient";
import { createTestUser, createTestCategory, createTestArtisan } from "../helpers/factories";
import { prisma } from "@/lib/prisma";

describe("Artisans endpoints", () => {
  it("GET /artisans returns artisan profiles", async () => {
    const category = await createTestCategory();
    await createTestArtisan(category.id);
    const client = await createTestUser({ role: "client" });

    const res = await authedApi(client.id, "client").get("/api/v1/artisans");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].user.passwordHash).toBeUndefined();
  });

  it("GET /artisans filters by category key", async () => {
    const carpentry = await prisma.category.create({ data: { key: "carpentry", icon: "hammer" } });
    const plumbing = await prisma.category.create({ data: { key: "plumbing", icon: "wrench" } });
    await createTestArtisan(carpentry.id);
    await createTestArtisan(plumbing.id);
    const client = await createTestUser({ role: "client" });

    const res = await authedApi(client.id, "client").get("/api/v1/artisans?category=carpentry");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].category.key).toBe("carpentry");
  });

  it("GET /artisans/:id returns the public profile incl. portfolio and reviews", async () => {
    const category = await createTestCategory();
    const { user, profile } = await createTestArtisan(category.id);
    const client = await createTestUser({ role: "client" });

    await prisma.portfolioImage.create({
      data: { artisanProfileId: profile.id, imageUrl: "https://example.com/work.jpg" },
    });

    const res = await authedApi(client.id, "client").get(`/api/v1/artisans/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body.data.user.id).toBe(user.id);
    expect(res.body.data.portfolio).toHaveLength(1);
    expect(res.body.data.portfolio[0].imageUrl).toBe("https://example.com/work.jpg");
  });

  it("PUT /artisans/me updates the artisan's own profile", async () => {
    const category = await createTestCategory();
    const { user } = await createTestArtisan(category.id);

    const res = await authedApi(user.id, "artisan").put("/api/v1/artisans/me").send({
      bio: "Furniture and repair specialist",
      rateType: "fixed",
      rateAmount: 15000,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.bio).toBe("Furniture and repair specialist");
    expect(res.body.data.rateType).toBe("fixed");
  });

  it("PUT /artisans/me rejects a client account", async () => {
    const client = await createTestUser({ role: "client" });

    const res = await authedApi(client.id, "client").put("/api/v1/artisans/me").send({ bio: "nope" });

    expect(res.status).toBe(403);
  });

  it("POST /artisans/me/portfolio adds an image", async () => {
    const category = await createTestCategory();
    const { user } = await createTestArtisan(category.id);

    const res = await authedApi(user.id, "artisan").post("/api/v1/artisans/me/portfolio").send({
      imageUrl: "https://example.com/portfolio.jpg",
      caption: "Finished wardrobe",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.imageUrl).toBe("https://example.com/portfolio.jpg");
  });

  it("DELETE /artisans/me/portfolio/:imageId removes an image", async () => {
    const category = await createTestCategory();
    const { user, profile } = await createTestArtisan(category.id);
    const image = await prisma.portfolioImage.create({
      data: { artisanProfileId: profile.id, imageUrl: "https://example.com/x.jpg" },
    });

    const res = await authedApi(user.id, "artisan").delete(`/api/v1/artisans/me/portfolio/${image.id}`);

    expect(res.status).toBe(200);
    const remaining = await prisma.portfolioImage.count();
    expect(remaining).toBe(0);
  });

  it("GET /artisans/:id/stamps returns earned stamp keys", async () => {
    const category = await createTestCategory();
    const { user, profile } = await createTestArtisan(category.id);
    await prisma.artisanStamp.create({
      data: { artisanProfileId: profile.id, stampKey: "first_job" },
    });
    const client = await createTestUser({ role: "client" });

    const res = await authedApi(client.id, "client").get(`/api/v1/artisans/${user.id}/stamps`);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(["first_job"]);
  });
});
