"use server";

import { themeKey } from "@/functions/user/preferences";
import { cookies } from "next/headers";

export async function setThemeAction(theme: string) {
  const cookieContainer = cookies();
  cookieContainer.set(themeKey, theme, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
}
