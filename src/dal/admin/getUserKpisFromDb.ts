import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { getRange } from "./_getRange";
import { and, gte, lt } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function getUserKpisFromDb() {
  const dayRange = getRange("day", 0);
  const yesterdayRange = getRange("day", -1);
  const monthRange = getRange("month", 0);
  const lastMonthRange = getRange("month", -1);

  const newUsersToday = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(and(gte(users.createdAt, dayRange.gte), lt(users.createdAt, dayRange.lt)))
    .then((r) => Number(r[0]?.count ?? 0));

  const newUsersYesterday = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(
      and(
        gte(users.createdAt, yesterdayRange.gte),
        lt(users.createdAt, yesterdayRange.lt)
      )
    )
    .then((r) => Number(r[0]?.count ?? 0));

  const newUsersThisMonth = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(
      and(gte(users.createdAt, monthRange.gte), lt(users.createdAt, monthRange.lt))
    )
    .then((r) => Number(r[0]?.count ?? 0));

  const newUsersLastMonth = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(
      and(
        gte(users.createdAt, lastMonthRange.gte),
        lt(users.createdAt, lastMonthRange.lt)
      )
    )
    .then((r) => Number(r[0]?.count ?? 0));

  return {
    newUsersToday,
    newUsersYesterday,
    newUsersThisMonth,
    newUsersLastMonth,
  };
}
