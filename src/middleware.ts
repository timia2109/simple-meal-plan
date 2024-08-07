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

function handleI18nRequest(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (isI18nPath(path)) {
    return i18nMiddleware(req);
  }

  return NextResponse.next();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function middleware(req: NextRequest, ctx: any) {
  const path = req.nextUrl.pathname;

  if (!path.startsWith("/api/auth")) {
    return authMiddleware(handleI18nRequest)(req, ctx);
  }

  return NextResponse.next();
}
