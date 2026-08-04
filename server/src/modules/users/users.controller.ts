import type { Request, Response } from "express";
import { ok } from "@/lib/apiResponse";
import * as usersService from "@/modules/users/users.service";

export async function getMe(req: Request, res: Response) {
  const user = await usersService.getCurrentUser(req.user!.id);
  return ok(res, user);
}

export async function updateLocale(req: Request, res: Response) {
  const user = await usersService.updateLocale(req.user!.id, req.body);
  return ok(res, user);
}
