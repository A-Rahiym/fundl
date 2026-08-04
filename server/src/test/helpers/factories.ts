import { faker } from "@faker-js/faker";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function createTestUser(
  overrides: Partial<{ role: Role; email: string; name: string; password: string }> = {},
) {
  return prisma.user.create({
    data: {
      name: overrides.name ?? faker.person.fullName(),
      email: overrides.email ?? faker.internet.email(),
      passwordHash: await hashPassword(overrides.password ?? "Password123!"),
      role: overrides.role ?? "client",
    },
  });
}

export async function createTestCategory() {
  return prisma.category.create({
    data: { key: faker.helpers.slugify(faker.commerce.department()).toLowerCase(), icon: "hammer" },
  });
}

export async function createTestJob(clientId: string, categoryId: number) {
  return prisma.job.create({
    data: {
      clientId,
      categoryId,
      title: faker.lorem.sentence(4),
      description: faker.lorem.paragraph(),
      status: "open",
    },
  });
}

export async function createTestArtisan(
  categoryId: number,
  overrides: Partial<{ rateType: string; rateAmount: number; isAvailable: boolean; bio: string }> = {},
) {
  const user = await createTestUser({ role: "artisan" });
  const profile = await prisma.artisanProfile.create({
    data: {
      userId: user.id,
      categoryId,
      bio: overrides.bio,
      rateType: (overrides.rateType ?? "hourly") as "hourly",
      rateAmount: overrides.rateAmount ?? 2000,
      isAvailable: overrides.isAvailable ?? true,
    },
  });
  return { user, profile };
}