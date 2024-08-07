import { prisma } from "@/server/db";

/** Return summarized entries from db */
export async function getKpisFromDb() {
  const users = await prisma.user.count();
  const mealPlans = await prisma.mealPlan.count();
  const mealEntries = await prisma.mealEntry.count();

  const invitations = await prisma.mealPlanInvite.count({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  return {
    mealPlans,
    mealEntries,
    invitations,
    users,
  };
}
