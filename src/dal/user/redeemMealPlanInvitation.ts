import { prisma } from "@/server/db/client";
import type { MealPlanInvite } from "@prisma/client";

/**
 * Redeems a MealPlanInvitation
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
};
