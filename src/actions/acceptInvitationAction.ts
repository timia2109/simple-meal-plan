"use server";

import { getInvitation } from "@/dal/user/getInvitation";
import { redeemMealPlanInvitation } from "@/dal/user/redeemMealPlanInvitation";
import { getUserId } from "@/functions/user/getUserId";
import { redirectWithLocale } from "@/functions/user/redirectWithLocale";

export async function acceptInvitationAction(invitationCode: string) {
  const userId = await getUserId(null);
  const invitation = await getInvitation(invitationCode, userId);

  if (invitation.result != "OK") {
    throw new Error("Invitation not found");
  }

  await redeemMealPlanInvitation(invitation.invitation, userId);
  redirectWithLocale(`/mealPlan/${invitation.invitation.mealPlan.id}`);
}
