import { router } from "../trpc";
import { mealPlanRouter } from "./mealPlan";

export const appRouter = router({
  mealPlan: mealPlanRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
