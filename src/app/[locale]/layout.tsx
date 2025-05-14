import { I18nProviderClient } from "@/locales/client";
import { Layout } from "@/PageProps";

const LocaleLayout: Layout<{locale: string}> = async ({params, children}) => {
  const {locale} = await params;
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}

export default LocaleLayout;