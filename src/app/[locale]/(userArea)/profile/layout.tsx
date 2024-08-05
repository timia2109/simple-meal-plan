import { Heading } from "@/components/common/Heading";
import { getScopedI18n } from "@/locales/server";
import { getRoute } from "@/routes";
import Link from "next/link";
import { ReactElement } from "react";

export default async function ProfileLayout({
  children,
}: {
  children: ReactElement;
}) {
  const t = await getScopedI18n("profile");

  return (
    <div className="container mx-1 md:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="mb-3 md:mb-0">
          <Heading>{t("title")}</Heading>
          <ul className="menu w-56 rounded-box bg-base-200">
            <li>
              <Link href={getRoute("profile")} className="active">
                {t("settings")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2">{children}</div>
      </div>
    </div>
  );
}
