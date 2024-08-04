"use server";

import { getInvitation } from "@/dal/user/getInvitation";
import { redeemMealPlanInvitation } from "@/dal/user/redeemMealPlanInvitation";
import { getUserId } from "@/functions/user/getUserId";
import { redirectRoute } from "@/routes";

export async function acceptInvitationAction(invitationCode: string) {
  const userId = await getUserId(null);
  const invitation = await getInvitation(invitationCode, userId);

  if (invitation.result != "OK") {
    throw new Error("Invitation not found");
  }

  await redeemMealPlanInvitation(invitation.invitation, userId);
  redirectRoute("mealPlan", invitation.invitation.mealPlan.id);
}
