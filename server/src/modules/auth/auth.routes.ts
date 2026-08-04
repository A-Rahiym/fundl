import { Router } from "express";
import { requireAuth } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { asyncHandler } from "@/lib/asyncHandler";
import { signupSchema, loginSchema } from "@/modules/auth/auth.schema";
import * as authController from "@/modules/auth/auth.controller";

export const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), asyncHandler(authController.signup));
authRouter.post("/login", validate(loginSchema), asyncHandler(authController.login));
authRouter.get("/me", requireAuth, asyncHandler(authController.me));
