import { Page, PageParams, Params, SearchParams } from "@/PageProps";
import { ReactNode } from "react";
import { z, ZodSchema } from "zod";

export function ZodPage<
  TParams extends PageParams,
  TSearchParams extends ZodSchema,
>(
  searchSchema: TSearchParams,
  handler: (args: {
    params: Params<TParams>;
    searchParams: Promise<z.infer<TSearchParams>>;
    plainSearchParams: SearchParams;
  }) => Promise<ReactNode>,
) {
  const pageHandler: Page<TParams, z.infer<TSearchParams>> = async ({
    params,
    searchParams,
  }) => {
    const searchParamsSchema = searchParams.then((s) =>
      searchSchema.parseAsync(s),
    );

    return handler({
      params,
      searchParams: searchParamsSchema,
      plainSearchParams: await searchParams,
    });
  };
  return pageHandler;
}
