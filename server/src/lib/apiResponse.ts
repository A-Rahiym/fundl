import type { Response } from "express";

export function ok<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function created<T>(res: Response, data: T) {
  return ok(res, data, 201);
}

export function paginated<T>(
  res: Response,
  items: T[],
  meta: { page: number; pageSize: number; total: number },
) {
  return res.status(200).json({ success: true, data: items, meta });
}
