import { prisma } from "@/server/db/client";
import type { MealPlanInvite } from "@prisma/client";

/**
 * Redeems a MealPlanInvitation
 * @returns The joined MealPlan
 */
export const redeemMealPlanInvitation = async (
  invitation: MealPlanInvite,
  targetUserId: string
) => {
  // Assign
  await prisma.mealPlanAssignment.create({
    data: {
      userDefault: false,
      mealPlanId: invitation.mealPlanId,
      userId: targetUserId,
    },
  });

  // Return MealPlan
  return await prisma.mealPlan.findUniqueOrThrow({
    where: {
      id: invitation.mealPlanId,
    },
  });
};
