import { DateTime } from "luxon";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const createDate = (isoDate: string) =>
  DateTime.fromISO(isoDate).startOf("day").toJSDate();

export const mealPlanRouter = router({
  getMealPlanFor: publicProcedure
    .input(
      z.object({
        date: z.string(),
      })
    )
    .query(async ({ ctx, input: { date } }) => {
      const queryDate = createDate(date);

      const entry = await ctx.prisma.mealEntry.findUnique({
        where: {
          date: queryDate,
        },
      });

      return entry;
    }),
  setMealPlanFor: publicProcedure
    .input(
      z.object({
        date: z.string(),
        meal: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { date, meal } }) => {
      const queryDate = createDate(date);

      if (meal.trim().length === 0) {
        const data = await prisma.mealEntry.delete({
          where: {
            date: queryDate,
          },
        });
        return data;
      }

      const result = await prisma.mealEntry.upsert({
        create: {
          date: queryDate,
          meal,
        },
        update: {
          meal,
        },
        where: {
          date: queryDate,
        },
      });

      return result;
    }),
});
