"use server";

import { setPreference } from "@/functions/user/preferences";

export async function setCalendarLayoutAction(layout: string) {
  setPreference("calendarLayout", layout);
}
