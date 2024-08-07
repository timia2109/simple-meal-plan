import { prisma } from "@/server/db";
import { getRange } from "./_getRange";

export async function getUserKpisFromDb() {
  const newUsersToday = await prisma.user.count({
    where: {
      createdAt: getRange("day", 0),
    },
  });

  const newUsersYesterday = await prisma.user.count({
    where: {
      createdAt: getRange("day", -1),
    },
  });

  const newUsersThisMonth = await prisma.user.count({
    where: {
      createdAt: getRange("month", 0),
    },
  });

  const newUsersLastMonth = await prisma.user.count({
    where: {
      createdAt: getRange("month", -1),
    },
  });

  return {
    newUsersToday,
    newUsersYesterday,
    newUsersThisMonth,
    newUsersLastMonth,
  };
}
