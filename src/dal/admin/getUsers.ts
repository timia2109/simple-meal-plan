import { prisma } from "@/server/db";
import type { PagingResult } from "@/types/PagingResult";
import type { User } from "@prisma/client";

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
  const dbQuery: Parameters<typeof prisma.user.findMany>[0] = {
    skip,
    take,
  };

  if (query) {
    dbQuery.where = {
      OR: [{ email: { contains: query } }, { name: { contains: query } }],
    };
  }

  const total = await prisma.user.count({ where: dbQuery.where });

  const users = await prisma.user.findMany({
    ...dbQuery,
    orderBy: { name: "asc" },
  });

  return {
    data: users,
    total,
    skip,
  };
}
