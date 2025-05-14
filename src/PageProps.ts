import type { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

export type PageParams = Record<string, string | string[]>;
export type SearchParams = Record<string, string | string[] | undefined>;

export type Params<TData extends PageParams> = Promise<TData>;

export type PageProps<
  TParams extends PageParams,
  TSearch extends SearchParams = never,
> = {
  params: Params<TParams>;
  searchParams: Promise<TSearch>;
};

export type Page<
  TParams extends PageParams,
  TSearch extends SearchParams = never,
> = (props: PageProps<TParams, TSearch>) => Promise<ReactNode>;

export type Layout<TParams extends PageParams> = (props: {
  children: ReactNode;
  params: Params<TParams>;
}) => Promise<ReactNode>;

export type GenerateMetadata<
  TParams extends Record<string, string>,
  TSearch extends PageParams = never,
> = (
  props: PageProps<TParams, TSearch>,
  parent: ResolvingMetadata,
) => Promise<Metadata>;
