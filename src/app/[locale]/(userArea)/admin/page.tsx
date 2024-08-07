import {
  getGeneralKpis,
  getMealPlansKpis,
  getUserKpis,
} from "@/functions/admin/kpiTools";
import { getScopedI18n } from "@/locales/server";
import { Suspense } from "react";
import { KpiContainer } from "./KpiContainer";

async function GeneralKpis() {
  const generalKpis = await getGeneralKpis();
  const t = await getScopedI18n("admin");

  return <KpiContainer kpis={generalKpis} title={t("generalKpis")} />;
}

async function MealPlanKpis() {
  const mealPlanKpis = await getMealPlansKpis();
  const t = await getScopedI18n("admin");

  return <KpiContainer kpis={mealPlanKpis} title={t("mealPlanKpis")} />;
}

async function UsersKpis() {
  const usersKpis = await getUserKpis();
  const t = await getScopedI18n("admin");

  return <KpiContainer kpis={usersKpis} title={t("usersKpis")} />;
}

export default function AdminPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <GeneralKpis />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <MealPlanKpis />
      <Suspense fallback={<div>Loading...</div>}>
        <UsersKpis />
      </Suspense>
    </div>
  );
}
