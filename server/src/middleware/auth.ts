import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";
import { AUTH_COOKIE_NAME } from "../lib/cookies";
import { UnauthorizedError } from "../lib/errors";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  // Preferred: HttpOnly cookie (browser). Fallback: Bearer header so
  // Postman / mobile / existing tests keep working during migration.
  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME] as string | undefined;
  const header = req.headers.authorization;
  const token = cookieToken ?? (header?.startsWith("Bearer ") ? header.slice(7) : undefined);
  if (!token) {
    return next(new UnauthorizedError());
  }
  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
