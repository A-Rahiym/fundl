import "dotenv/config";

import { env } from "@/config/env";
import { app } from "@/app";
import { logger } from "@/lib/logger";

app.listen(env.PORT, () => {
  logger.info(`fundi-api listening on :${env.PORT}`);
});
