import { prisma } from "../../lib/prisma";
import { NotFoundError, ValidationError } from "../../lib/errors";
import { toPublicUser } from "../../lib/user";
import { lgasOf } from "../../config/nigeria";
import type { UpdateLocaleInput, UpdateProfileInput } from "./users.schema";

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

/**
 * Partial profile update. State/LGA are validated against the vendored
 * dataset (a lone LGA resolves against the user's saved state) and
 * dual-written into locationText so existing displays keep working.
 */
export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing) throw new NotFoundError("User");

  const touchedLocation = input.state !== undefined || input.lga !== undefined;
  const state = input.state ?? existing.state;
  // Switching state drops a possibly-stale saved LGA; otherwise keep it.
  const lga = input.lga ?? (input.state !== undefined ? undefined : existing.lga);

  if (touchedLocation && lga) {
    if (!state) throw new ValidationError("State is required when lga is given");
    if (!lgasOf(state).includes(lga)) {
      throw new ValidationError("LGA does not belong to the given state");
    }
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(input.name ? { name: input.name } : {}),
      ...(input.phone !== undefined ? { phone: input.phone } : {}),
      ...(input.state !== undefined ? { state: input.state } : {}),
      ...(touchedLocation ? { lga: lga ?? null } : {}),
      ...(touchedLocation ? { locationText: composeLocation(state, lga) } : {}),
    },
  });
  return toPublicUser(user);
}

function composeLocation(
  state: string | null | undefined,
  lga: string | null | undefined,
): string | null {
  if (lga && state) return `${lga}, ${state}`;
  return state ?? lga ?? null;
}
