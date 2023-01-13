import { z } from "zod";
import { createMealPlanInvitation } from "../../../dal/mealPlans/createMealPlanInvitation";
import { leaveMealPlan } from "../../../dal/mealPlans/leaveMealPlan";
import { MealPlanOperationProps } from "../../../dal/mealPlans/mealListAccessGuard";
import { readMealEntries } from "../../../dal/mealPlans/readMealEntries";
import { submitMealEntry } from "../../../dal/mealPlans/submitMealEntry";
import { Context } from "../context";
import { protectedProcedure, router } from "../trpc";

const defaultInput = z.object({
  mealPlanId: z.string(),
});

type MutationInputProps<TProps extends z.infer<typeof defaultInput>> = {
  ctx: Context;
  input: TProps;
};

type Handler<TReturn, TProps extends MealPlanOperationProps> = (
  props: TProps
) => Promise<TReturn>;

const invokeMealPlanAction: <
  TReturn,
  TProps extends z.infer<typeof defaultInput>
>(
  handler: Handler<TReturn, TProps & MealPlanOperationProps>
) => (p: MutationInputProps<TProps>) => Promise<TReturn> = (handler) => {
  return ({ ctx, input }) =>
    handler({
      ...input,
      client: ctx.prisma,
      userId: ctx.session!.user!.id,
    });
};

export const mealPlanRouter = router({
  createMealPlanInvitation: protectedProcedure
    .input(defaultInput)
    .mutation(invokeMealPlanAction(createMealPlanInvitation)),
  leaveMealPlan: protectedProcedure
    .input(defaultInput)
    .mutation(invokeMealPlanAction(leaveMealPlan)),
  readMealEntries: protectedProcedure
    .input(
      defaultInput.extend({
        range: z.object({
          begin: z.date(),
          end: z.date(),
        }),
      })
    )
    .query(invokeMealPlanAction(readMealEntries)),
  submitMealEntry: protectedProcedure
    .input(
      defaultInput.extend({
        date: z.date(),
        meal: z.string(),
      })
    )
    .mutation(invokeMealPlanAction(submitMealEntry)),
});
