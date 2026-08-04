import { api, authedApi } from "@/test/helpers/testClient";
import { createTestUser } from "@/test/helpers/factories";
import

describe("Auth endpoints", () => {
  it("POST /auth/signup creates an account and returns a token", async () => {
    const res = await api.post("/api/v1/auth/signup").send({
      name: "Test Client",
      email: "test.client@example.com",
      password: "Password123!",
      role: "client",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe("test.client@example.com");
    expect(res.body.data.user.passwordHash).toBeUndefined();
  });

  it("POST /auth/signup rejects a duplicate email", async () => {
    await createTestUser({ email: "dup@example.com", role: "client" });

    const res = await api.post("/api/v1/auth/signup").send({
      name: "Duplicate",
      email: "dup@example.com",
      password: "Password123!",
      role: "client",
    });

    expect(res.status).toBe(409);
  });

  it("POST /auth/signup rejects an invalid payload", async () => {
    const res = await api.post("/api/v1/auth/signup").send({
      name: "X",
      email: "not-an-email",
      password: "short",
      role: "wizard",
    });

    expect(res.status).toBe(422);
  });

  it("POST /auth/login returns a token for valid credentials", async () => {
    await createTestUser({ email: "login@example.com", password: "Password123!", role: "client" });

    const res = await api.post("/api/v1/auth/login").send({
      email: "login@example.com",
      password: "Password123!",
    });

    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe("login@example.com");
  });

  it("POST /auth/login rejects bad credentials", async () => {
    const res = await api.post("/api/v1/auth/login").send({
      email: "nobody@example.com",
      password: "wrong-password",
    });

    expect(res.status).toBe(401);
  });

  it("GET /auth/me returns the authenticated user", async () => {
    const user = await createTestUser({ role: "client" });

    const res = await authedApi(user.id, "client").get("/api/v1/auth/me");

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(user.id);
    expect(res.body.data.email).toBe(user.email);
  });

  it("GET /auth/me rejects a missing token", async () => {
    const res = await api.get("/api/v1/auth/me");

    expect(res.status).toBe(401);
  });
});
