import { prisma } from "@/server/db";
import { z } from "zod";

export const OrderByEnum = z.enum(["count", "meal", "first", "last"]);
export const SortDirectionEnum = z.enum(["asc", "desc"]);

type Props = {
  startDate: Date;
  endDate: Date;
  mealPlanId: string;
  skip: number;
  take: number;
  orderBy: z.infer<typeof OrderByEnum>;
  direction: z.infer<typeof SortDirectionEnum>;
};

export type SummaryEntry = {
  meal: string;
  first: Date;
  last: Date;
  count: number;
};

export type SummaryResult = {
  results: SummaryEntry[];
  totalCount: number;
};

export const getMealPlanSummary = async ({
  endDate,
  mealPlanId,
  skip,
  startDate,
  take,
  orderBy,
  direction,
}: Props) => {
  const query: Parameters<typeof prisma.mealEntry.groupBy>[0] = {
    by: "meal",
    where: {
      AND: [
        { mealPlanId },
        {
          date: {
            gte: startDate,
          },
        },
        {
          date: {
            lte: endDate,
          },
        },
      ],
    },
    _count: true,
    _min: {
      date: true,
    },
    _max: {
      date: true,
    },
    orderBy: {
      _count: {
        meal: direction,
      },
    },
  };

  switch (orderBy) {
    case "count":
      query.orderBy = {
        _count: {
          meal: direction,
        },
      };
      break;
    case "first":
      query.orderBy = {
        _min: {
          date: direction,
        },
      };
      break;
    case "last":
      query.orderBy = {
        _max: {
          date: direction,
        },
      };
      break;
    case "meal":
      query.orderBy = {
        meal: direction,
      };
      break;
  }

  const results = await prisma.mealEntry.groupBy(query);

  const totalCount = results.length;
  const pagedGroups = results.slice(skip, skip + take).map(
    (r) =>
      ({
        meal: r.meal,
        count: r._count as number,
        first: (r._min as { date: Date }).date,
        last: (r._max as { date: Date }).date,
      }) as SummaryEntry,
  );

  return { totalCount, results: pagedGroups } as SummaryResult;
};
