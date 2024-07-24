import { I18nProviderClient } from "@/locales/client";
import type { ReactElement } from "react";

export default async function LocaleLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
