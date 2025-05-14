"use server";

import { setPreference } from "@/functions/user/preferences";

export async function setThemeAction(theme: string) {
  await setPreference("theme", theme);
}
