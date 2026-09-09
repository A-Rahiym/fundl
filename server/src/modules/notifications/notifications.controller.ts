import type { Request, Response } from "express";
import { ok } from "../../lib/apiResponse";
import { parsePaginationParams } from "../../lib/pagination";
import * as notificationsService from "./notifications.service";

export async function listNotifications(req: Request, res: Response) {
  const { skip, take } = parsePaginationParams(req.query);
  const notifications = await notificationsService.listNotifications(req.user!.id, skip, take);
  return ok(res, notifications);
}

export async function markRead(req: Request, res: Response) {
  const notification = await notificationsService.markNotificationRead(
    req.user!.id,
    req.params.id!,
  );
  return ok(res, notification);
}
