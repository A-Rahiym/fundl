import type { CookieOptions, Response } from "express";
import { env } from "../config/env";

export const AUTH_COOKIE_NAME = "fundi_token";

/** 7 days in ms — matches default JWT_EXPIRES_IN. */
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function baseCookieOptions(): CookieOptions {
  // Cross-site (Vercel frontend -> Railway/Render API) requires
  // SameSite=None + Secure. Same-origin dev over http can't use Secure,
  // so only force it in production or when explicitly enabled.
  const secure = env.NODE_ENV === "production" || env.COOKIE_SECURE === true;
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(AUTH_COOKIE_NAME, token, baseCookieOptions());
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE_NAME, { ...baseCookieOptions(), maxAge: undefined });
}
