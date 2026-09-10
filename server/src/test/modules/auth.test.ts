import { api, authedApi, cookieApi, extractAuthCookie } from "../helpers/testClient";
import { createTestUser, createTestCategory } from "../helpers/factories";
import { prisma } from "../../lib/prisma";

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

  it("POST /auth/signup stores the composed location", async () => {
    const res = await api.post("/api/v1/auth/signup").send({
      name: "Lagos Client",
      email: "lagos.client@example.com",
      password: "Password123!",
      role: "client",
      locationText: "Ikeja, Lagos",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.user.locationText).toBe("Ikeja, Lagos");
  });

  it("POST /auth/signup creates an artisan profile when a trade is picked", async () => {
    const category = await createTestCategory();

    const res = await api.post("/api/v1/auth/signup").send({
      name: "New Artisan",
      email: "new.artisan@example.com",
      password: "Password123!",
      role: "artisan",
      locationText: "Barnawa, Kaduna",
      categoryKey: category.key,
    });

    expect(res.status).toBe(201);
    const profile = await prisma.artisanProfile.findUnique({
      where: { userId: res.body.data.user.id },
    });
    expect(profile).not.toBeNull();
    expect(profile?.categoryId).toBe(category.id);
  });

  it("POST /auth/signup rejects an unknown trade", async () => {
    const res = await api.post("/api/v1/auth/signup").send({
      name: "Lost Artisan",
      email: "lost.artisan@example.com",
      password: "Password123!",
      role: "artisan",
      categoryKey: "no-such-trade",
    });

    expect(res.status).toBe(404);
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

  it("POST /auth/signup sets an HttpOnly auth cookie", async () => {
    const res = await api.post("/api/v1/auth/signup").send({
      name: "Cookie Client",
      email: "cookie.client@example.com",
      password: "Password123!",
      role: "client",
    });

    expect(res.status).toBe(201);
    const setCookie = res.headers["set-cookie"] as unknown as string[];
    expect(setCookie.join(";")).toMatch(/fundi_token=.+;.*HttpOnly/i);
  });

  it("authenticates via cookie and clears it on logout", async () => {
    const signup = await api.post("/api/v1/auth/signup").send({
      name: "Cookie User",
      email: "cookie.user@example.com",
      password: "Password123!",
      role: "client",
    });
    const cookie = extractAuthCookie(signup);

    const me = await cookieApi(cookie).get("/api/v1/auth/me");
    expect(me.status).toBe(200);
    expect(me.body.data.email).toBe("cookie.user@example.com");

    const logout = await cookieApi(cookie).post("/api/v1/auth/logout");
    expect(logout.status).toBe(200);
    expect(logout.body.data.loggedOut).toBe(true);
    expect(String(logout.headers["set-cookie"] ?? "")).toMatch(/fundi_token=/);
  });
});
