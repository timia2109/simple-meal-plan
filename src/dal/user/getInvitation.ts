import { prisma } from "@/server/db/client";
import { MealPlan, MealPlanInvite, User } from "@prisma/client";

/**
 * Returns if the current invitation is still valid
 * @param invitation The invitation
 * @returns Is currently valid
 */
const isCurrentlyValid = (invitation: MealPlanInvite) => {
  const now = new Date();
  return invitation.expiresAt >= now;
};

export type InvitationReturn =
  | null
  | "EXPIRED"
  | (MealPlanInvite & {
      mealPlan: MealPlan;
      user: User;
    });

/**
 * Gets an invitation by its code
 * @param invitationCode Invitation code
 * @returns The invitation, or null if not found, or "EXPIRED" if the invitation is expired
 */
export async function getInvitation(
  invitationCode: string
): Promise<InvitationReturn> {
  const invitation = await prisma.mealPlanInvite.findUnique({
    where: {
      invitationCode,
    },
    include: {
      mealPlan: true,
      user: true,
    },
  });

  if (invitation === null) return null;
  if (!isCurrentlyValid(invitation)) return "EXPIRED";

  return invitation;
}
