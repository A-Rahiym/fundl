import express from "express";
import cors from "cors";
import { requestLogger } from "@/middleware/requestLogger";
import { errorHandler } from "@/middleware/errorHandler";
import { resolveLocale } from "@/lib/locale";
import { authRouter } from "@/modules/auth/auth.routes";
import { usersRouter } from "@/modules/users/users.routes";
import { categoriesRouter } from "@/modules/categories/categories.routes";
import { artisansRouter } from "@/modules/artisans/artisans.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use((req, _res, next) => {
  req.locale = resolveLocale(req);
  next();
});

app.get("/api/v1/health", (_req, res) => {
  res.json({ ok: true, service: "fundi-api" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/artisans", artisansRouter);

app.use(errorHandler);
