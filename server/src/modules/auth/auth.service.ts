import type { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ConflictError, UnauthorizedError } from "../../lib/errors";
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
    },
  });

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
