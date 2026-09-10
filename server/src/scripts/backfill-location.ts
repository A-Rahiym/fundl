import { prisma } from "../lib/prisma";
import { NIGERIAN_STATES } from "../config/nigeria";

/**
 * One-off backfill: parses legacy free-text `locationText` values
 * ("LGA, State" or "State") into the structured state/lga columns.
 * Rerunnable and idempotent — rows already carrying a state are skipped.
 * Usage: `tsx src/scripts/backfill-location.ts [--dry-run]`
 */

export function parseLocation(
  text: string | null | undefined,
): { state: string; lga?: string } | null {
  if (!text) return null;
  const parts = text
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;

  const byName = (name: string) =>
    NIGERIAN_STATES.find((s) => s.state.toLowerCase() === name.toLowerCase());

  if (parts.length >= 2) {
    const lgaRaw = parts[0]!;
    const stateRaw = parts.slice(1).join(", ");
    const state = byName(stateRaw);
    if (!state) return null;
    const lga = state.lgas.find((l) => l.toLowerCase() === lgaRaw.toLowerCase());
    if (!lga) return null;
    return { state: state.state, lga };
  }

  const state = byName(parts[0]!);
  return state ? { state: state.state } : null;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const report = { usersMatched: 0, usersSkipped: 0, jobsMatched: 0, jobsSkipped: 0 };

  const users = await prisma.user.findMany({
    where: { state: null, locationText: { not: null } },
    select: { id: true, locationText: true },
  });
  for (const user of users) {
    const parsed = parseLocation(user.locationText);
    if (!parsed) {
      report.usersSkipped += 1;
      continue;
    }
    report.usersMatched += 1;
    if (!dryRun) {
      await prisma.user.update({
        where: { id: user.id },
        data: { state: parsed.state, lga: parsed.lga ?? null },
      });
    }
  }

  const jobs = await prisma.job.findMany({
    where: { state: null, locationText: { not: null } },
    select: { id: true, locationText: true },
  });
  for (const job of jobs) {
    const parsed = parseLocation(job.locationText);
    if (!parsed) {
      report.jobsSkipped += 1;
      continue;
    }
    report.jobsMatched += 1;
    if (!dryRun) {
      await prisma.job.update({
        where: { id: job.id },
        data: { state: parsed.state, lga: parsed.lga ?? null },
      });
    }
  }

  console.log(dryRun ? "DRY RUN" : "APPLIED", JSON.stringify(report));
  await prisma.$disconnect();
}

// Runs only when invoked directly (`tsx src/scripts/backfill-location.ts`);
// importing this module (e.g. from tests) exposes parseLocation alone.
const invokedDirectly = process.argv[1]?.endsWith("backfill-location.ts") ?? false;
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
