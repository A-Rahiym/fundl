import { authedApi } from "../helpers/testClient";
import { createTestUser } from "../helpers/factories";

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

  it("PUT /users/me updates name, state and lga with dual-written locationText", async () => {
    const user = await createTestUser({ role: "client" });

    const res = await authedApi(user.id, "client").put("/api/v1/users/me").send({
      name: "Adaeze Okafor",
      state: "Kaduna",
      lga: "Zaria",
    });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Adaeze Okafor");
    expect(res.body.data.state).toBe("Kaduna");
    expect(res.body.data.lga).toBe("Zaria");
    expect(res.body.data.locationText).toBe("Zaria, Kaduna");
  });

  it("PUT /users/me rejects an unknown state", async () => {
    const user = await createTestUser({ role: "client" });

    const res = await authedApi(user.id, "client").put("/api/v1/users/me").send({ state: "Atlantis" });

    expect(res.status).toBe(422);
  });

  it("PUT /users/me rejects an LGA outside the state", async () => {
    const user = await createTestUser({ role: "client" });

    const res = await authedApi(user.id, "client")
      .put("/api/v1/users/me")
      .send({ state: "Kaduna", lga: "Ikeja" });

    expect(res.status).toBe(422);
  });

  it("PUT /users/me resolves a lone LGA against the saved state", async () => {
    const user = await createTestUser({ role: "client" });
    const api = authedApi(user.id, "client");

    await api.put("/api/v1/users/me").send({ state: "Lagos" });
    const res = await api.put("/api/v1/users/me").send({ lga: "Ikeja" });

    expect(res.status).toBe(200);
    expect(res.body.data.lga).toBe("Ikeja");
    expect(res.body.data.locationText).toBe("Ikeja, Lagos");
  });

  it("PUT /users/me switching state clears a stale LGA", async () => {
    const user = await createTestUser({ role: "client" });
    const api = authedApi(user.id, "client");

    await api.put("/api/v1/users/me").send({ state: "Kaduna", lga: "Zaria" });
    const res = await api.put("/api/v1/users/me").send({ state: "Lagos" });

    expect(res.status).toBe(200);
    expect(res.body.data.state).toBe("Lagos");
    expect(res.body.data.lga).toBeNull();
    expect(res.body.data.locationText).toBe("Lagos");
  });
});
