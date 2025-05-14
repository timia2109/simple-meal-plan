import { SearchParams } from "@/PageProps";
import { FC } from "react";

type Props = {
  searchParams: SearchParams;
  omit?: string[];
};

export const SearchParamsFields: FC<Props> = ({ omit, searchParams }) => {
  const filter: (k: [string, string | string[] | undefined]) => boolean =
    omit != undefined
      ? ([k, v]) => v != undefined && omit.indexOf(k) == -1
      : ([k, v]) => v != undefined;

  return (
    <>
      {Object.entries(searchParams)
        .filter(filter)
        .map(([k, v], i) => (
          <input type="hidden" key={i} name={k} value={v} />
        ))}
    </>
  );
};
