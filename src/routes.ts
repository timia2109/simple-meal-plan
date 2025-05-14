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
  admin: () => withLocale("/admin"),
  adminUsers: () => withLocale("/admin/users"),
};

/** Adds the locale to the route */
async function withLocale(target: string) {
  const locale = await getCurrentLocale();
  return `/${locale}${target}`;
}

type Routes = typeof routes;

export async function getRoute<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): Promise<string> {
  return await (routes[key] as (...params: TParams) => Promise<string>)(...params);
}

export async function redirectRoute<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): Promise<never> {
  redirect(await getRoute(key, ...params));
}

export async function revalidateRoute<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): Promise<void> {
  revalidatePath(await getRoute(key, ...params));
}

export async function getRouteUrl<
  TKey extends keyof Routes,
  TParams extends Parameters<Routes[TKey]>
>(key: TKey, ...params: TParams): Promise<URL> {
  const route = await getRoute(key, ...params);
  return buildUrl(route);
}
