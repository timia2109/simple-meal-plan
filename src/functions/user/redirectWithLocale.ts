import { getCurrentLocale } from "@/locales/server";
import { redirect } from "next/navigation";

/**
 * Redirects to the target with the current locale as prefix.
 * @example redirectWithLocale("/mealPlan")
 */
export function redirectWithLocale(target: string) {
  const locale = getCurrentLocale();
  redirect(`/${locale}${target}`);
}
