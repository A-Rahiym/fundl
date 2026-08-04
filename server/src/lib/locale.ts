import type { Request } from "express";
import type { Locale } from "@prisma/client";
import { LOCALES } from "@/config/constants";

/** Resolves the request locale from the ?lang= override, then Accept-Language. */
export function resolveLocale(req: Request): Locale {
  const query = req.query.lang;
  if (typeof query === "string" && isLocale(query)) return query;

  const header = req.headers["accept-language"];
  if (header) {
    for (const part of header.split(",")) {
      const tag = part.trim().split(";")[0]?.toLowerCase() ?? "";
      const code = tag.split("-")[0] as string;
      if (isLocale(code)) return code;
    }
  }
  return "en";
}

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
