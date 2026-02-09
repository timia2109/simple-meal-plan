import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import type { PagingResult } from "@/types/PagingResult";
import type { User } from "@/server/db/schema";
import { or, like, asc } from "drizzle-orm";
import { sql } from "drizzle-orm";

/**
 * Searches for users (or returns all)
 * @param query SearchQuery for Email or Name
 * @param skip Items to skip
 * @param take Items to take (per page)
 * @returns List of users
 */
export async function getUsers(
  query: string | undefined,
  skip: number,
  take: number
): Promise<PagingResult<User>> {
  const whereCondition = query
    ? or(
        like(users.email, `%${query}%`),
        like(users.name, `%${query}%`)
      )
    : undefined;

  const total = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(whereCondition)
    .then((r) => Number(r[0]?.count ?? 0));

  const usersResult = await db
    .select()
    .from(users)
    .where(whereCondition)
    .orderBy(asc(users.name))
    .limit(take)
    .offset(skip);

  return {
    data: usersResult,
    total,
    skip,
  };
}
