import createMiddleware from "next-intl/middleware";

export const locales = ["en", "de"];
export const i18nMatcher = ["/", `/(${locales.join("|")})/:path*`];

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",
});
