import { prisma } from "@/server/db";
import { getRange } from "./_getRange";

/** Gets KPIs to meal entries in different time units */
export async function getMealEntriesKpisFromDb() {
  const mealEntriesThisMonth = await prisma.mealEntry.count({
    where: {
      updatedAt: getRange("month", 0),
    },
  });

  const mealEntriesLastMonth = await prisma.mealEntry.count({
    where: {
      updatedAt: getRange("month", -1),
    },
  });

  const mealEntriesToday = await prisma.mealEntry.count({
    where: {
      updatedAt: getRange("day", 0),
    },
  });

  const mealEntriesYesterday = await prisma.mealEntry.count({
    where: {
      updatedAt: getRange("day", -1),
    },
  });

  return {
    mealEntriesThisMonth,
    mealEntriesLastMonth,
    mealEntriesToday,
    mealEntriesYesterday,
  };
}
