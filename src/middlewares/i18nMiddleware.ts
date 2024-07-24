import { createI18nMiddleware } from "next-international/middleware";

export const locales = ["en", "de"];

export default createI18nMiddleware({
  locales,
  defaultLocale: "en",
});
