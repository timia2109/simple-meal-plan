import type { Prisma, PrismaClient } from "@prisma/client";
import type { PrismaClientOptions } from "@prisma/client/runtime";

/** Properties for functions that operate on a meal plan*/
export type MealPlanOperationProps = {
  client: PrismaClient<
    PrismaClientOptions,
    unknown,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userId: string;
  mealPlanId: string;
};

type Handler<TReturn, TProps extends MealPlanOperationProps> = (
  props: TProps
) => Promise<TReturn>;

/**
 * Checks if the given user have access to the meal plan
 * ONLY if the user has access the handler is invoked
 * @param props Properties
 * @param handler Handler function
 * @returns The return of the handler
 */
export const mealListAccessGuard: <
  TReturn,
  TProps extends MealPlanOperationProps
>(
  props: TProps,
  handler: Handler<TReturn, TProps>
) => Promise<TReturn> = async (props, handler) => {
  const assignment = await props.client.mealPlanAssignment.findFirst({
    where: {
      userId: props.userId,
      mealPlanId: props.mealPlanId,
    },
  });

  if (assignment === null) throw new Error("Unauthorized");

  return await handler(props);
};

/** Helper to wrap functions */
export const withMealListAccessGuard: <
  TReturn,
  TProps extends MealPlanOperationProps = MealPlanOperationProps
>(
  handler: Handler<TReturn, TProps>
) => (props: TProps) => Promise<TReturn> = (handler) => {
  return (props) => mealListAccessGuard(props, handler);
};
