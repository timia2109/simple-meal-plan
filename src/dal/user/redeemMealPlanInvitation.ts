import type { MealPlanInvite, PrismaClient } from "@prisma/client";
import { DateTime, Duration } from "luxon";
import { env } from "../../env/server.mjs";

type Props = {
  userId: string;
  invitationCode: string;
  client: PrismaClient;
};

/**
 * Returns if the current invitation is still valid
 * @param invitation The invitation
 * @returns Is currently valid
 */
const isCurrentlyValid = (invitation: MealPlanInvite) => {
  const now = DateTime.now();
  const validity = Duration.fromISO(env.INVITATION_VALIDITY);
  return DateTime.fromJSDate(invitation.createdAt).plus(validity) >= now;
};

/**
 * Redeems a MealPlanInvitation
 * @param param0 Props
 * @returns The joined MealPlan
 */
export const redeemMealPlanInvitation = async ({
  userId,
  invitationCode,
  client,
}: Props) => {
  const invitation = await client.mealPlanInvite.findUnique({
    where: {
      invitationCode,
    },
  });

  if (invitation === null) throw new Error("INVITATION_NOT_FOUND");

  if (!isCurrentlyValid(invitation)) throw new Error("INVITATION_EXPIRED");

  // Assign
  await client.mealPlanAssignment.create({
    data: {
      userDefault: false,
      mealPlanId: invitation.mealPlanId,
      userId: userId,
    },
  });

  // Return MealPlan
  return await client.mealPlan.findUniqueOrThrow({
    where: {
      id: invitation.mealPlanId,
    },
  });
};
