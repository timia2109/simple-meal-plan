import { db } from "@/server/db";
import { mealPlanAssignments, type MealPlanInvite } from "@/server/db/schema";

/**
 * Redeems a MealPlanInvitation
 */
export const redeemMealPlanInvitation = async (
  invitation: MealPlanInvite,
  targetUserId: string
) => {
  // Assign
  await db.insert(mealPlanAssignments).values({
    userDefault: false,
    mealPlanId: invitation.mealPlanId,
    userId: targetUserId,
  });
};
