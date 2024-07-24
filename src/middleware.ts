"use server";
import { authMiddleware } from "@/middlewares/authMiddleware";
import i18nMiddleware, { i18nMatcher } from "@/middlewares/i18nMiddleware";
import { NextResponse, type NextRequest } from "next/server";

function matches(path: string, matcher: string | string[]) {
  if (Array.isArray(matcher)) {
    return matcher.some((m) => path.match(m));
  }
  return path.match(matcher);
}

export const middleware = authMiddleware((req: NextRequest) => {
  const path = req.nextUrl.pathname;

  if (matches(path, i18nMatcher)) {
    return i18nMiddleware(req);
  }

  return NextResponse.next();
});
