import { z } from "zod";
import { createMealPlanInvitation } from "../../../dal/mealPlans/createMealPlanInvitation";
import { leaveMealPlan } from "../../../dal/mealPlans/leaveMealPlan";
import type { MealPlanOperationProps } from "../../../dal/mealPlans/mealListAccessGuard";
import { readMealEntries } from "../../../dal/mealPlans/readMealEntries";
import { submitMealEntry } from "../../../dal/mealPlans/submitMealEntry";
import { protectedProcedure, router, type TRPCHandler } from "../trpc";

/** Default Input for MealPlan actions */
const defaultInput = z.object({
  mealPlanId: z.string(),
});

/** Type of the input */
type DefaultInputType = z.infer<typeof defaultInput>;

/** Type of a trpc call */
type MutationInputProps<TProps extends DefaultInputType> = TRPCHandler<TProps>;

/** Type of a MealPlan Action */
type MealPlanAction<TReturn, TProps extends MealPlanOperationProps> = (
  props: TProps
) => Promise<TReturn>;

/**
 * Invokes the mealPlanAction
 * @param data Request data
 * @param handler Handler to use
 * @returns result of the handler
 */
function invokeMealPlanAction<
  TReturn,
  TProps extends DefaultInputType,
  THandlerProps extends MealPlanOperationProps = TProps &
    Exclude<MealPlanOperationProps, DefaultInputType>
>(
  data: MutationInputProps<TProps>,
  handler: MealPlanAction<TReturn, THandlerProps>
): Promise<TReturn> {
  const { ctx, input } = data;
  return handler({
    client: ctx.prisma,
    // Always defined!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    userId: ctx.session!.user!.id,
    ...input,
  } as never); // IDK the TS error, when removing this
}

/** Create a function to direct use on trpc using a MealPlanHandler */
const wrapMealPlanAction: <
  TReturn,
  TProps extends DefaultInputType,
  THandlerProps extends MealPlanOperationProps = TProps &
    Omit<MealPlanOperationProps, "mealPlanId">
>(
  handler: MealPlanAction<TReturn, THandlerProps>
) => (input: MutationInputProps<TProps>) => Promise<TReturn> =
  (handler) => (input) =>
    invokeMealPlanAction(input, handler);

export const mealPlanRouter = router({
  createMealPlanInvitation: protectedProcedure
    .input(defaultInput)
    .mutation(wrapMealPlanAction(createMealPlanInvitation)),
  leaveMealPlan: protectedProcedure
    .input(defaultInput)
    .mutation(wrapMealPlanAction(leaveMealPlan)),
  readMealEntries: protectedProcedure
    .input(
      defaultInput.extend({
        range: z.object({
          begin: z.date(),
          end: z.date(),
        }),
      })
    )
    .query(wrapMealPlanAction(readMealEntries)),
  submitMealEntry: protectedProcedure
    .input(
      defaultInput.extend({
        date: z.date(),
        meal: z.string(),
      })
    )
    .mutation(wrapMealPlanAction(submitMealEntry)),
});
