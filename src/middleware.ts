"use server";
import { authMiddleware } from "@/middlewares/authMiddleware";
import i18nMiddleware from "@/middlewares/i18nMiddleware";
import type { AppRouteHandlerFnContext } from "next-auth/lib/types";
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

export function middleware(req: NextRequest, ctx: AppRouteHandlerFnContext) {
  const path = req.nextUrl.pathname;

  if (!path.startsWith("/api/auth")) {
    return authMiddleware(handleI18nRequest)(req, ctx);
  }

  return NextResponse.next();
}
