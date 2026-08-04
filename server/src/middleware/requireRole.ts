import type { Request, Response, NextFunction } from "express";
import type { Role } from "@prisma/client";
import { ForbiddenError } from "@/lib/errors";

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError());
    }
    next();
  };
}
