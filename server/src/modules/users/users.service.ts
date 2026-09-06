import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../lib/errors";
import { toPublicUser } from "../../lib/user";
import type { UpdateLocaleInput } from "./users.schema";

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError("User");
  return toPublicUser(user);
}

export async function updateLocale(userId: string, input: UpdateLocaleInput) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { locale: input.locale },
  });
  return toPublicUser(user);
}
