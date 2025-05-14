import type { Metadata, ResolvingMetadata } from "next"
import { ReactNode } from "react"

type Params<TData extends Record<string, string|string[]>> = Promise<TData>

export type PageProps<
    TParams extends Record<string, string|string[]>,
    TSearch extends Record<string, string | string[] | undefined> = never
> = {
    params: Params<TParams>
    searchParams: Promise<TSearch>
}

export type Page<
    TParams extends Record<string, string|string[]>,
    TSearch extends Record<string, string | string[] | undefined> = never
> = (props: PageProps<TParams, TSearch>) => Promise<ReactNode>

export type Layout<TParams extends Record<string, string>> = (props: {
    children: ReactNode
    params: Params<TParams>
}) => Promise<ReactNode>

export type GenerateMetadata<
    TParams extends Record<string, string>,
    TSearch extends Record<string, string | string[]> = never
> = (
    props: PageProps<TParams, TSearch>,
    parent: ResolvingMetadata
) => Promise<Metadata>