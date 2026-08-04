import { api } from "@/test/helpers/testClient";
import { prisma } from "@/lib/prisma";

describe("Categories endpoints", () => {
  it("GET /categories returns available categories", async () => {
    await prisma.category.create({
      data: {
        key: "carpentry",
        icon: "hammer",
      },
    });

    const res = await api.get("/api/v1/categories");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ key: "carpentry", icon: "hammer" })]),
    );
  });
});
