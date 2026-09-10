import type { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../lib/errors";
import { hashPassword, comparePassword } from "../../lib/password";
import { signAccessToken } from "../../lib/jwt";
import { toPublicUser } from "../../lib/user";
import type { SignupInput, LoginInput } from "./auth.schema";

export async function signup(input: SignupInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new ConflictError("An account with this email already exists");

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: await hashPassword(input.password),
      role: input.role,
      locale: input.locale,
      phone: input.phone,
      locationText: input.locationText,
    },
  });

  // Artisans who pick a trade at signup get their profile skeleton now;
  // the edit screen fills in the rest later.
  if ((input.role === "artisan" || input.role === "both") && input.categoryKey) {
    const category = await prisma.category.findUnique({ where: { key: input.categoryKey } });
    if (!category) throw new NotFoundError("Category");
    await prisma.artisanProfile.create({
      data: { userId: user.id, categoryId: category.id, rateType: "negotiable" },
    });
  }

  return authResponse(user);
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !(await comparePassword(input.password, user.passwordHash))) {
    throw new UnauthorizedError("Invalid email or password");
  }
  return authResponse(user);
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new UnauthorizedError("Account no longer exists");
  return toPublicUser(user);
}

function authResponse(user: User) {
  return { token: signAccessToken({ sub: user.id, role: user.role }), user: toPublicUser(user) };
}
