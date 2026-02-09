import { db } from "@/server/db";
import { mealEntries } from "@/server/db/schema";
import { getRange } from "./_getRange";
import { and, gte, lt } from "drizzle-orm";
import { sql } from "drizzle-orm";

/** Gets KPIs to meal entries in different time units */
export async function getMealEntriesKpisFromDb() {
  const monthRange = getRange("month", 0);
  const lastMonthRange = getRange("month", -1);
  const dayRange = getRange("day", 0);
  const yesterdayRange = getRange("day", -1);

  const mealEntriesThisMonth = await db
    .select({ count: sql<number>`count(*)` })
    .from(mealEntries)
    .where(
      and(
        gte(mealEntries.updatedAt, monthRange.gte),
        lt(mealEntries.updatedAt, monthRange.lt)
      )
    )
    .then((r) => Number(r[0]?.count ?? 0));

  const mealEntriesLastMonth = await db
    .select({ count: sql<number>`count(*)` })
    .from(mealEntries)
    .where(
      and(
        gte(mealEntries.updatedAt, lastMonthRange.gte),
        lt(mealEntries.updatedAt, lastMonthRange.lt)
      )
    )
    .then((r) => Number(r[0]?.count ?? 0));

  const mealEntriesToday = await db
    .select({ count: sql<number>`count(*)` })
    .from(mealEntries)
    .where(
      and(
        gte(mealEntries.updatedAt, dayRange.gte),
        lt(mealEntries.updatedAt, dayRange.lt)
      )
    )
    .then((r) => Number(r[0]?.count ?? 0));

  const mealEntriesYesterday = await db
    .select({ count: sql<number>`count(*)` })
    .from(mealEntries)
    .where(
      and(
        gte(mealEntries.updatedAt, yesterdayRange.gte),
        lt(mealEntries.updatedAt, yesterdayRange.lt)
      )
    )
    .then((r) => Number(r[0]?.count ?? 0));

  return {
    mealEntriesThisMonth,
    mealEntriesLastMonth,
    mealEntriesToday,
    mealEntriesYesterday,
  };
}
