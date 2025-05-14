import PagingComponent from "@/components/common/PagingComponent";
import { SearchParamsFields } from "@/components/common/SearchParamsFields";
import {
  getMealPlanSummary,
  OrderByEnum,
  SortDirectionEnum,
  SummaryEntry,
} from "@/dal/mealPlans/getMealPlanSummary";
import { ZodPage } from "@/functions/zodPage";
import { getCurrentLocale } from "@/locales/server";
import { SearchParams } from "@/PageProps";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { DateTime } from "luxon";
import { FC } from "react";
import { z } from "zod";

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
          searchParams={plainSearchParams}
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
  searchParams: SearchParams;
}> = ({ direction, orderBy, results, dateFormat, searchParams }) => {
  return (
    <div>
      <form method="get">
        <table className="table">
          <thead>
            <tr>
              <TableSortHeader
                direction={direction}
                field="count"
                orderBy={orderBy}
                searchParams={searchParams}
                title="Anzahl"
              />
              <TableSortHeader
                direction={direction}
                field="meal"
                orderBy={orderBy}
                searchParams={searchParams}
                title="Gericht"
              />
              <TableSortHeader
                direction={direction}
                field="first"
                orderBy={orderBy}
                searchParams={searchParams}
                title="Zuerst"
              />
              <TableSortHeader
                direction={direction}
                field="last"
                orderBy={orderBy}
                searchParams={searchParams}
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
      </form>
    </div>
  );
};

const TableSortHeader: FC<{
  orderBy: z.infer<typeof OrderByEnum>;
  direction: z.infer<typeof SortDirectionEnum>;
  field: z.infer<typeof OrderByEnum>;
  searchParams: SearchParams;
  title: string;
}> = ({ direction, field, orderBy, searchParams, title }) => {
  const isActive = field == orderBy;

  return (
    <th
      className={classNames({
        "text-black": isActive,
      })}
    >
      <SearchParamsFields
        searchParams={searchParams}
        omit={["orderBy", "direction"]}
      />
      <button type="submit" name="orderBy" value={field}>
        {title}
        {isActive && (
          <FontAwesomeIcon
            icon={direction == "asc" ? faCaretUp : faCaretDown}
          />
        )}
      </button>
    </th>
  );
};

const SummarySelector: FC<z.infer<typeof SearchParamsSchema>> = ({
  endDate,
  startDate,
}) => {
  return (
    <form method="GET">
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
