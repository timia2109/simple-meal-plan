import { env } from "@/env/server.mjs";
import { db } from "@/server/db";
import { mealPlanInvites } from "@/server/db/schema";
import { DateTime, Duration } from "luxon";
import { generate } from "randomstring";
import { eq, and, gt } from "drizzle-orm";

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
  const existingInvitation = await db
    .select()
    .from(mealPlanInvites)
    .where(
      and(
        eq(mealPlanInvites.mealPlanId, mealPlanId),
        eq(mealPlanInvites.createdByUserId, userId),
        gt(mealPlanInvites.expiresAt, now)
      )
    )
    .limit(1)
    .then((r) => r[0]);

  if (existingInvitation) return existingInvitation;

  const expiration = DateTime.now().plus(invitationExpiresIn);

  const invitationCode = generate({
    length: stringLength,
    capitalization: "uppercase",
  });

  await db.insert(mealPlanInvites).values({
    createdByUserId: userId,
    mealPlanId: mealPlanId,
    expiresAt: expiration.toJSDate(),
    invitationCode,
  });

  const newInvitation = await db
    .select()
    .from(mealPlanInvites)
    .where(eq(mealPlanInvites.invitationCode, invitationCode))
    .limit(1)
    .then((r) => r[0]);

  if (!newInvitation) {
    throw new Error("Failed to create meal plan invitation");
  }

  return newInvitation;
}
