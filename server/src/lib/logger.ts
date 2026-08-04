import pino from "pino";
import { env } from "@/config/env";
export const logger = pino(
  {
    level: process.env.LOG_LEVEL ?? "info",
    redact: { paths: ["passwordHash", "*.password"], censor: "[REDACTED]" },
  },

  env.NODE_ENV === "development"
    ? pino.destination({ dest: "logs/fundi-api.log", mkdir: true, sync: false })
    : pino.destination({ dest: 1, sync: true }),
);
