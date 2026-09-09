import type { Request, Response, NextFunction } from "express";

/**
 * Test stub for the ESM-only @scalar/express-api-reference package, which
 * ts-jest cannot parse. The docs UI is irrelevant to API tests; this keeps
 * the same middleware shape: a factory returning an Express handler.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiReference(_options?: unknown) {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ docs: "stubbed in tests" });
    next();
  };
}
