import type { Request, Response } from "express";
import { ok } from "@/lib/apiResponse";
import * as categoriesService from "@/modules/categories/categories.service";

export async function listCategories(_req: Request, res: Response) {
  const categories = await categoriesService.listCategories();
  return ok(res, categories);
}
