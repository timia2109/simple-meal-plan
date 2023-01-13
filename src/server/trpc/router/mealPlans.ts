import { z } from "zod";
import { createMealPlan } from "../../../dal/mealPlans/createMealPlan";
import { getMealPlan } from "../../../dal/mealPlans/getMealPlans";
import { redeemMealPlanInvitation } from "../../../dal/user/redeemMealPlanInvitation";
import { protectedProcedure, router } from "../trpc";

/** Router for general MealPlan actions */
export const mealPlansRouter = router({
  getMealPlans: protectedProcedure.query(({ ctx }) => {
    return getMealPlan(ctx.prisma, ctx.session.user.id);
  }),
  createMealPlan: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(({ ctx, input: { title } }) =>
      createMealPlan(ctx.prisma, ctx.session.user.id, title)
    ),
  redeemMealPlanInvitation: protectedProcedure
    .input(
      z.object({
        invitationCode: z.string(),
      })
    )
    .mutation(({ ctx, input: { invitationCode } }) =>
      redeemMealPlanInvitation({
        client: ctx.prisma,
        userId: ctx.session.user.id,
        invitationCode,
      })
    ),
});
