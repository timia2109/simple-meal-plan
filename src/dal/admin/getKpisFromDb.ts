import { db } from "@/server/db";
import { users, mealPlans, mealEntries, mealPlanInvites } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { lt } from "drizzle-orm";

/** Return summarized entries from db */
export async function getKpisFromDb() {
  const usersCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .then((r) => Number(r[0]?.count ?? 0));

  const mealPlansCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(mealPlans)
    .then((r) => Number(r[0]?.count ?? 0));

  const mealEntriesCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(mealEntries)
    .then((r) => Number(r[0]?.count ?? 0));

  const invitationsCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(mealPlanInvites)
    .where(lt(mealPlanInvites.expiresAt, new Date()))
    .then((r) => Number(r[0]?.count ?? 0));

  return {
    mealPlans: mealPlansCount,
    mealEntries: mealEntriesCount,
    invitations: invitationsCount,
    users: usersCount,
  };
}
