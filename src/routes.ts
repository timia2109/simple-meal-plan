import { getCurrentLocale } from "@/locales/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildUrl } from "./functions/buildUrl";

// All routes of the app are here defined for an easy central route generation
const routes = {
  mealPlan: (
    mealPlanId?: string,
    year?: string | number,
    month?: string | number
  ) => {
    let path = "/mealPlan";
    if (mealPlanId !== undefined) path += `/${mealPlanId}`;
    if (year !== undefined) path += `/${year}`;
    if (month !== undefined) path += `/${month}`;
    return withLocale(path);
  },
  home: () => withLocale("/"),
  manage: () => withLocale("/manage"),
  invite: (mealPlanId: string) => withLocale(`/invite/${mealPlanId}`),
  invitationLink: (invitationCode: string) =>
    `/?invitationCode=${invitationCode}`,
  join: (invitationCode: string) =>
    withLocale(`/mealPlan/join/${invitationCode}`),
  profile: () => withLocale("/profile"),
};

/** Adds the locale to the route */
function withLocale(target: string) {
  const locale = getCurrentLocale();
  return `/${locale}${target}`;
}

type Routes = typeof routes;

export function getRoute<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): string {
  return (routes[key] as (...params: TParams) => string)(...params);
}

export function redirectRoute<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): never {
  redirect(getRoute(key, ...params));
}

export function revalidateRoute<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): void {
  revalidatePath(getRoute(key, ...params));
}

export function getRouteUrl<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): URL {
  const route = getRoute(key, ...params);
  return buildUrl(route);
}
