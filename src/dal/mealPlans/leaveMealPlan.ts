import { prisma } from "@/server/db/client";

type Props = {
  userId: string;
  mealPlanId: string;
};

/**
 * Removes a User from a meal plan
 */
export async function leaveMealPlan({ mealPlanId, userId }: Props) {
  // Must exist, the guard will care
  await prisma.mealPlanAssignment.delete({
    where: {
      mealPlanId_userId: {
        mealPlanId,
        userId,
      },
    },
  });

  // Check if there is any remaining member
  const assignmentCount = await prisma.mealPlanAssignment.count({
    where: {
      mealPlanId,
    },
  });

  // Delete if this list has no participent
  if (assignmentCount === 0) {
    await prisma.mealPlan.delete({
      where: {
        id: mealPlanId,
      },
    });
  }
}
