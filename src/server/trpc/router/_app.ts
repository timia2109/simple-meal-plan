import { router } from "../trpc";
import { mealPlanRouter } from "./mealPlan";
import { mealPlansRouter } from "./mealPlans";

export const appRouter = router({
  mealPlan: mealPlanRouter,
  mealPlans: mealPlansRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
