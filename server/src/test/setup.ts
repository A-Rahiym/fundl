import { execSync } from "node:child_process";

export default async function globalSetup() {
  // Applies pending migrations to the test DB (docker-compose.test.yml points
  // DATABASE_URL at fundi_test) before any test file runs.
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
}
