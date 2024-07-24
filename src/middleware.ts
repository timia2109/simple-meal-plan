"use server";
import { authMiddleware } from "@/middlewares/authMiddleware";
import i18nMiddleware from "@/middlewares/i18nMiddleware";
import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "de"];

function isI18nPath(path: string) {
  return (
    path == "" ||
    path == "/" ||
    locales.some((locale) => path.startsWith(`/${locale}`))
  );
}

export const middleware = authMiddleware((req: NextRequest) => {
  const path = req.nextUrl.pathname;

  if (isI18nPath(path)) {
    return i18nMiddleware(req);
  }

  return NextResponse.next();
});
