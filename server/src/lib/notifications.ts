import { prisma } from "./prisma";

export type NotificationType =
  | "offer.received"
  | "offer.accepted"
  | "offer.declined"
  | "job.completed";

/** Persist an inbox row. Callers await this alongside their main write. */
export async function notifyUser(
  userId: string,
  type: NotificationType,
  payload: { jobId?: string; offerId?: string },
) {
  await prisma.notification.create({ data: { userId, type, payload } });
}
