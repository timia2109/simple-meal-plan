import { prisma } from "@/server/db";

export function renameMealPlan(mealPlanId: string, title: string) {
  return prisma.mealPlan.update({
    where: {
      id: mealPlanId,
    },
    data: {
      title,
    },
  });
}
