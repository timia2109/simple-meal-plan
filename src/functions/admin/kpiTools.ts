import { getKpisFromDb } from "@/dal/admin/getKpisFromDb";
import { getMealEntriesKpisFromDb } from "@/dal/admin/getMealEntriesKpisFromDb";
import { getUserKpisFromDb } from "@/dal/admin/getUserKpisFromDb";
import { getScopedI18n } from "@/locales/server";
import { formatKpiNumber } from "../formatKpiNumber";

export type Kpi = {
  title: string;
  subtitle?: string;
  value: number | string;
};

export function getComparingKpi(
  title: string,
  currentValue: number,
  previousValue: number
): Kpi {
  const diff = currentValue - previousValue;
  const percentage = (diff / previousValue) * 100;
  const isPositive = diff > 0;

  return {
    title,
    subtitle: `${isPositive ? "↗︎" : "↘︎"} ${diff} (${percentage.toFixed(1)}%)`,
    value: formatKpiNumber(currentValue),
  };
}

export async function getGeneralKpis(): Promise<Kpi[]> {
  const t = await getScopedI18n("admin");
  const { invitations, mealEntries, mealPlans, users } = await getKpisFromDb();

  return [
    { title: t("users"), value: users },
    { title: t("invitations"), value: invitations },
    { title: t("mealEntries"), value: mealEntries },
    { title: t("mealPlans"), value: mealPlans },
  ];
}

export async function getMealPlansKpis(): Promise<Kpi[]> {
  const t = await getScopedI18n("admin");
  const {
    mealEntriesLastMonth,
    mealEntriesThisMonth,
    mealEntriesToday,
    mealEntriesYesterday,
  } = await getMealEntriesKpisFromDb();

  return [
    getComparingKpi(
      t("mealEntriesThisMonth"),
      mealEntriesThisMonth,
      mealEntriesLastMonth
    ),
    getComparingKpi(
      t("mealEntriesToday"),
      mealEntriesToday,
      mealEntriesYesterday
    ),
  ];
}

export async function getUserKpis(): Promise<Kpi[]> {
  const t = await getScopedI18n("admin");
  const {
    newUsersLastMonth,
    newUsersThisMonth,
    newUsersToday,
    newUsersYesterday,
  } = await getUserKpisFromDb();

  return [
    getComparingKpi(
      t("newUsersThisMonth"),
      newUsersThisMonth,
      newUsersLastMonth
    ),
    getComparingKpi(t("newUsersToday"), newUsersToday, newUsersYesterday),
  ];
}
