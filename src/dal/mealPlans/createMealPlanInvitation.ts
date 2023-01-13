import { generate } from "randomstring";
import {
  withMealListAccessGuard,
  type MealPlanOperationProps,
} from "./mealListAccessGuard";

type Props = MealPlanOperationProps;

const stringLength = 12;

/** Creates a invitation to a MealList */
export const createMealPlanInvitation = withMealListAccessGuard(
  ({ client, mealPlanId, userId }: Props) =>
    client.mealPlanInvite.create({
      data: {
        createdByUserId: userId,
        mealPlanId: mealPlanId,
        invitationCode: generate({
          length: stringLength,
          capitalization: "uppercase",
        }),
      },
    })
);
