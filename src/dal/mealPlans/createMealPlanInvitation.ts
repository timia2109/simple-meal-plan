import { env } from "@/env/server.mjs";
import { prisma } from "@/server/db/client";
import { DateTime, Duration } from "luxon";
import { generate } from "randomstring";

type Props = {
  userId: string;
  mealPlanId: string;
};

const stringLength = 12;
const invitationExpiresIn = Duration.fromISO(env.INVITATION_VALIDITY);

/** Creates a invitation to a MealList */
export function createMealPlanInvitation({ mealPlanId, userId }: Props) {
  const expiration = DateTime.now().plus(invitationExpiresIn);

  return prisma.mealPlanInvite.create({
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
