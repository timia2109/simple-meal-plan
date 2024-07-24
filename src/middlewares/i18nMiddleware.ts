import { createI18nMiddleware } from "next-international/middleware";

export const locales = ["en", "de"];
export const i18nMatcher = [
  "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
];

export default createI18nMiddleware({
  locales,
  defaultLocale: "en",
});
