-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "lga" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lga" TEXT,
ADD COLUMN     "state" TEXT;

-- CreateIndex
CREATE INDEX "jobs_state_idx" ON "jobs"("state");

-- CreateIndex
CREATE INDEX "users_state_idx" ON "users"("state");
