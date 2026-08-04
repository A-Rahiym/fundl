import { authedApi } from "@/test/helpers/testClient";
import { createTestUser } from "@/test/helpers/factories";

describe("Users endpoints", () => {
  it("GET /users/me returns the current user incl. locale", async () => {
    const user = await createTestUser({ role: "client" });

    const res = await authedApi(user.id, "client").get("/api/v1/users/me");

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(user.id);
    expect(res.body.data.locale).toBe("en");
  });

  it("PUT /users/me/locale updates the saved preference", async () => {
    const user = await createTestUser({ role: "client" });

    const res = await authedApi(user.id, "client").put("/api/v1/users/me/locale").send({ locale: "yo" });

    expect(res.status).toBe(200);
    expect(res.body.data.locale).toBe("yo");
  });

  it("PUT /users/me/locale rejects an unsupported locale", async () => {
    const user = await createTestUser({ role: "client" });

    const res = await authedApi(user.id, "client").put("/api/v1/users/me/locale").send({ locale: "fr" });

    expect(res.status).toBe(422);
  });
});