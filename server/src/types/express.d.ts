import type { Locale, Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: Role };
      locale: Locale;
    }
  }
}

export {};
