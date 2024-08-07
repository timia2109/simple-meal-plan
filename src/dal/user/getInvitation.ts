import { prisma } from "@/server/db";
import type { MealPlan, MealPlanInvite, User } from "@prisma/client";

/**
 * Returns if the current invitation is still valid
 * @param invitation The invitation
 * @returns Is currently valid
 */
const isCurrentlyValid = (invitation: MealPlanInvite) => {
  const now = new Date();
  return invitation.expiresAt >= now;
};

type SuccessResult = {
  result: "OK";
  invitation: MealPlanInvite & {
    mealPlan: MealPlan;
    user: User;
  };
};

type ExpiredResult = {
  result: "EXPIRED";
};

type NotFoundResult = {
  result: "NOT_FOUND";
};

type JoinedResult = {
  result: "JOINED";
  invitation: MealPlanInvite & {
    mealPlan: MealPlan;
    user: User;
  };
};

export type InvitationReturn = SuccessResult | ExpiredResult | NotFoundResult;

export type UserInvitationReturn = InvitationReturn | JoinedResult;

/**
 * Gets an invitation by its code
 * @param invitationCode Invitation code
 * @returns The invitation, or null if not found, or "EXPIRED" if the invitation is expired
 */
export async function getInvitation(
  invitationCode: string
): Promise<InvitationReturn>;
export async function getInvitation(
  invitationCode: string,
  userId: string
): Promise<UserInvitationReturn>;
export async function getInvitation(
  invitationCode: string,
  userId?: string
): Promise<InvitationReturn | UserInvitationReturn> {
  const invitation = await prisma.mealPlanInvite.findUnique({
    where: {
      invitationCode,
    },
    include: {
      mealPlan: true,
      user: true,
    },
  });

  if (invitation === null) return { result: "NOT_FOUND" };
  if (!isCurrentlyValid(invitation)) return { result: "EXPIRED" };

  if (userId != undefined) {
    // Check if user is already a participant
    const participant = await prisma.mealPlanAssignment.findFirst({
      where: {
        userId,
        mealPlanId: invitation.mealPlanId,
      },
    });

    if (participant != null) {
      return {
        invitation,
        result: "JOINED",
      };
    }
  }

  return {
    invitation,
    result: "OK",
  };
}
