import type { Request, Response } from "express";
import { ok, created } from "../../lib/apiResponse";
import * as authService from "./auth.service";

export async function signup(req: Request, res: Response) {
  const result = await authService.signup(req.body);
  return created(res, result);
}

export async function login(req: Request, res: Response) {
  const result = await authService.login(req.body);
  return ok(res, result);
}

export async function me(req: Request, res: Response) {
  const user = await authService.getCurrentUser(req.user!.id);
  return ok(res, user);
}
