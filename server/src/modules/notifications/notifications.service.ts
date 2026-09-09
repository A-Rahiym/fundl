import { prisma } from "../../lib/prisma";
import { NotFoundError, ForbiddenError } from "../../lib/errors";

export async function listNotifications(userId: string, skip: number, take: number) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
    skip,
    take,
  });
}

export async function markNotificationRead(userId: string, id: string) {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification) throw new NotFoundError("Notification");
  if (notification.userId !== userId)
    throw new ForbiddenError("You can only read your own notifications");

  return prisma.notification.update({ where: { id }, data: { isRead: true } });
}
