import { env } from "@/env/server.mjs";
import { prisma } from "@/server/db/client";
import { DateTime, Duration } from "luxon";
import { generate } from "randomstring";

const stringLength = 12;
const invitationExpiresIn = Duration.fromISO(env.INVITATION_VALIDITY);

/**
 * Creates an Invitation (or return a valid one if it exists) for a Meal Plan
 * @param mealPlanId Meal Plan Id
 * @param userId User Id
 * @returns A invitation code
 */
export async function createMealPlanInvitation(
  mealPlanId: string,
  userId: string
) {
  const now = new Date();

  // Check for existing invitation
  const existingInvitation = await prisma.mealPlanInvite.findFirst({
    where: {
      mealPlanId: mealPlanId,
      createdByUserId: userId,
      expiresAt: {
        gt: now,
      },
    },
  });

  if (existingInvitation) return existingInvitation;

  const expiration = DateTime.now().plus(invitationExpiresIn);

  return await prisma.mealPlanInvite.create({
    data: {
      createdByUserId: userId,
      mealPlanId: mealPlanId,
      expiresAt: expiration.toJSDate(),
      invitationCode: generate({
        length: stringLength,
        capitalization: "uppercase",
      }),
    },
  });
}
