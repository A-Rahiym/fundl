import request from "supertest";
import type { Role } from "@prisma/client";
import { app } from "../../app";
import { signAccessToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";

export const api = request(app);

const TRUNCATED_TABLES = [
  "reviews",
  "artisan_stamps",
  "portfolio_images",
  "offers",
  "jobs",
  "notifications",
  "artisan_profiles",
  "categories",
  "users",
];

afterEach(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${TRUNCATED_TABLES.join(", ")} RESTART IDENTITY CASCADE`);
});

export function authedApi(userId: string, role: Role) {
  const token = signAccessToken({ sub: userId, role });
  return {
    get: (url: string) => api.get(url).set("Authorization", `Bearer ${token}`),
    post: (url: string) => api.post(url).set("Authorization", `Bearer ${token}`),
    put: (url: string) => api.put(url).set("Authorization", `Bearer ${token}`),
    delete: (url: string) => api.delete(url).set("Authorization", `Bearer ${token}`),
  };
}

/** Build an agent that sends the raw `fundi_token=...` cookie instead of a Bearer header. */
export function cookieApi(cookie: string) {
  return {
    get: (url: string) => api.get(url).set("Cookie", cookie),
    post: (url: string) => api.post(url).set("Cookie", cookie),
    put: (url: string) => api.put(url).set("Cookie", cookie),
    delete: (url: string) => api.delete(url).set("Cookie", cookie),
  };
}

/** Extract the `fundi_token=...` cookie from a signup/login response. */
export function extractAuthCookie(res: { headers: Record<string, unknown> }): string {
  const setCookie = res.headers["set-cookie"] as unknown as string[] | string | undefined;
  const cookies = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
  const auth = cookies.find((c) => c.startsWith("fundi_token="));
  if (!auth) throw new Error("Expected fundi_token cookie to be set");
  return auth.split(";")[0] as string;
}
