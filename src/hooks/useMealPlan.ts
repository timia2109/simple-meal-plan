import type { MealEntry } from "@prisma/client";
import { DateTime } from "luxon";
import { useCallback, useMemo } from "react";
import type { DateRange } from "../types/TimeRange";
import { trpc } from "../utils/trpc";

const zeroDate = new Date(0);

/** Wraps the Access to the actual meal plan */
export function useMealPlan(mealPlanId: string, range: DateRange) {
  const { data, isLoading } = trpc.mealPlan.readMealEntries.useQuery({
    mealPlanId,
    range: { begin: range.begin, end: range.end },
  });

  const entryMap: Record<string, MealEntry> = useMemo(() => {
    if (data === undefined) return {};

    const map: Record<string, MealEntry> = {};

    for (const entry of data) {
      map[DateTime.fromJSDate(entry.date).toSQLDate()] = entry;
    }

    return map;
  }, [data]);

  const getEntryFor = useCallback<(date: DateTime) => MealEntry>(
    (date) => {
      const emptyEntry: MealEntry = {
        createdAt: zeroDate,
        updatedAt: zeroDate,
        date: date.toJSDate(),
        meal: "",
        mealPlanId: mealPlanId,
      };

      return entryMap[date.toSQLDate()] ?? emptyEntry;
    },
    [entryMap, mealPlanId]
  );

  return { isLoading, getEntryFor };
}
