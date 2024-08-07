import type { Kpi } from "@/functions/admin/kpiTools";
import type { FC } from "react";

type Props = {
  kpis: Kpi[];
  title: string;
};

export const KpiContainer: FC<Props> = ({ kpis, title }) => (
  <div>
    <p className="my-4 text-2xl font-bold">{title}</p>
    <div className="stats stats-vertical shadow lg:stats-horizontal">
      {kpis.map((kpi, index) => (
        <div className="stat" key={index}>
          <div className="stat-title">{kpi.title}</div>
          <div className="stat-value">{kpi.value}</div>
          <div className="stat-desc">{kpi.subtitle}</div>
        </div>
      ))}
    </div>
  </div>
);
