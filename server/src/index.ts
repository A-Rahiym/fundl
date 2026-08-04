import "dotenv/config";

import { env } from "./config/env";

const { PORT } = env;

console.log(`fundi-api listening on :${PORT}`);
