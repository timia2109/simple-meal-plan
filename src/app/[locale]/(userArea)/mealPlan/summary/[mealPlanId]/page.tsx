import PagingComponent from "@/components/common/PagingComponent";
import {
  getMealPlanSummary,
  OrderByEnum,
  SortDirectionEnum,
  SummaryEntry,
} from "@/dal/mealPlans/getMealPlanSummary";
import { ZodPage } from "@/functions/zodPage";
import { getCurrentLocale } from "@/locales/server";
import { DateTime } from "luxon";
import { FC } from "react";
import { z } from "zod";
import { TableSortHeader } from "./TableSortHeader";

const SearchParamsSchema = z.object({
  startDate: z.coerce
    .date()
    .default(() => DateTime.now().startOf("year").toJSDate()),
  endDate: z.coerce
    .date()
    .default(() => DateTime.now().endOf("year").toJSDate()),
  pageSize: z.coerce.number().default(100),
  skip: z.coerce.number().default(0),
  orderBy: OrderByEnum.default("count"),
  direction: SortDirectionEnum.default("desc"),
});

const SummaryPage = ZodPage<{ mealPlanId: string }, typeof SearchParamsSchema>(
  SearchParamsSchema,
  async ({ params, searchParams, plainSearchParams }) => {
    const { mealPlanId } = await params;
    const search = await searchParams;
    const { skip, endDate, pageSize, startDate, direction, orderBy } = search;

    const locale = await getCurrentLocale();
    const dateFormat = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      weekday: "short",
    });

    const { results, totalCount } = await getMealPlanSummary({
      endDate,
      mealPlanId,
      startDate,
      skip,
      take: pageSize,
      direction,
      orderBy,
    });

    return (
      <div className="container mx-auto">
        <SummarySelector {...search} />

        <ResultsTable
          direction={direction}
          orderBy={orderBy}
          results={results}
          dateFormat={dateFormat}
        />

        <PagingComponent
          searchParams={plainSearchParams}
          pageSize={pageSize}
          skip={skip}
          total={totalCount}
        />
      </div>
    );
  },
);

const ResultsTable: FC<{
  results: SummaryEntry[];
  orderBy: z.infer<typeof OrderByEnum>;
  direction: z.infer<typeof SortDirectionEnum>;
  dateFormat: Intl.DateTimeFormat;
}> = ({ direction, orderBy, results, dateFormat }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <TableSortHeader
              direction={direction}
              field="count"
              orderBy={orderBy}
              title="Anzahl"
            />
            <TableSortHeader
              direction={direction}
              field="meal"
              orderBy={orderBy}
              title="Gericht"
            />
            <TableSortHeader
              direction={direction}
              field="first"
              orderBy={orderBy}
              title="Zuerst"
            />
            <TableSortHeader
              direction={direction}
              field="last"
              orderBy={orderBy}
              title="Zuletzt"
            />
          </tr>
        </thead>
        <tbody>
          {results.map((s) => (
            <tr key={s.meal}>
              <th scope="row">{s.count}</th>
              <td>{s.meal}</td>
              <td>{dateFormat.format(s.first)}</td>
              <td>{dateFormat.format(s.last)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SummarySelector: FC<z.infer<typeof SearchParamsSchema>> = ({
  endDate,
  startDate,
}) => {
  return (
    <form method="get">
      <div className="border-primary mb-3 flex justify-between rounded border p-3">
        <label className="input input-bordered flex items-center gap-2">
          Ab
          <input
            name="startDate"
            type="date"
            className="grow"
            defaultValue={DateTime.fromJSDate(startDate).toSQLDate()!}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          Bis
          <input
            name="endDate"
            type="date"
            className="grow"
            defaultValue={DateTime.fromJSDate(endDate).toSQLDate()!}
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Suchen
        </button>
      </div>
    </form>
  );
};

export default SummaryPage;
