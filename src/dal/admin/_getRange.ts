import { DateTime } from "luxon";

/**
 * Generates a range of time based on the type and plus
 * @param type Type of time unit
 * @param plus Unit to add
 * @returns Prisma ready Range
 */
export function getRange(type: "day" | "week" | "month", plus: number) {
  const end = DateTime.now();
  const start = end.minus({ [type]: plus + 1 });

  return {
    gte: start.toJSDate(),
    lt: end.toJSDate(),
  };
}
