import { authedApi } from "../helpers/testClient";
import {
  createTestUser,
  createTestCategory,
  createTestJob,
  createTestArtisan,
} from "../helpers/factories";
import { parseLocation } from "../../scripts/backfill-location";
import { prisma } from "../../lib/prisma";

describe("parseLocation", () => {
  it("parses 'LGA, State' pairs", () => {
    expect(parseLocation("Zaria, Kaduna")).toEqual({ state: "Kaduna", lga: "Zaria" });
  });

  it("parses a bare state", () => {
    expect(parseLocation("Lagos")).toEqual({ state: "Lagos" });
  });

  it("is case-insensitive and trims whitespace", () => {
    expect(parseLocation("  ikeja , lagos ")).toEqual({ state: "Lagos", lga: "Ikeja" });
  });

  it("returns null for unknown or empty text", () => {
    expect(parseLocation(null)).toBeNull();
    expect(parseLocation("")).toBeNull();
    expect(parseLocation("Atlantis")).toBeNull();
    expect(parseLocation("Ikeja, Kaduna")).toBeNull();
  });
});

describe("State filters", () => {
  it("GET /artisans filters by state", async () => {
    const category = await createTestCategory();
    const { user: artisanA } = await createTestArtisan(category.id);
    const { user: artisanB } = await createTestArtisan(category.id);
    const viewer = await createTestUser({ role: "client" });

    await authedApi(artisanA.id, "artisan").put("/api/v1/users/me").send({ state: "Kaduna" });
    await authedApi(artisanB.id, "artisan").put("/api/v1/users/me").send({ state: "Lagos" });

    const res = await authedApi(viewer.id, "client").get("/api/v1/artisans?state=Kaduna");

    expect(res.status).toBe(200);
    const ids = (res.body.data as Array<{ userId: string }>).map((a) => a.userId);
    expect(ids).toContain(artisanA.id);
    expect(ids).not.toContain(artisanB.id);
  });

  it("GET /jobs filters by state", async () => {
    const client = await createTestUser({ role: "client" });
    const artisan = await createTestUser({ role: "artisan" });
    const category = await createTestCategory();
    const jobA = await createTestJob(client.id, category.id);
    const jobB = await createTestJob(client.id, category.id);
    await prisma.job.update({ where: { id: jobA.id }, data: { state: "Kaduna" } });
    await prisma.job.update({ where: { id: jobB.id }, data: { state: "Lagos" } });

    const res = await authedApi(artisan.id, "artisan").get("/api/v1/jobs?state=Kaduna");

    expect(res.status).toBe(200);
    const ids = (res.body.data as Array<{ id: string }>).map((j) => j.id);
    expect(ids).toContain(jobA.id);
    expect(ids).not.toContain(jobB.id);
  });
});
