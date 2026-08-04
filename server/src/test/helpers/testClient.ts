import request from "supertest";
import type { Role } from "@prisma/client";
import { app } from "@/app";
import { signAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

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
