import { prisma } from "@/server/db/client";
import { generate } from "randomstring";

type Props = {
  userId: string;
  mealPlanId: string;
};

const stringLength = 12;

/** Creates a invitation to a MealList */
export function createMealPlanInvitation({ mealPlanId, userId }: Props) {
  return prisma.mealPlanInvite.create({
    data: {
      createdByUserId: userId,
      mealPlanId: mealPlanId,
      invitationCode: generate({
        length: stringLength,
        capitalization: "uppercase",
      }),
    },
  });
}
