import { cookies } from "next/headers";

export const themeKey = "smp-theme";
export const calendarLayoutKey = "smp-calendar";

const preferences = {
  theme: "smp-theme",
  calendarLayout: "smp-calendar",
};

type Preferences = typeof preferences;

async function getPreference<TValue extends string>(
  key: keyof Preferences,
  defaultValue?: TValue
): Promise<TValue> {
  const cookieContainer = await cookies();
  const value =
    (cookieContainer.get(preferences[key])?.value as TValue) ?? defaultValue;

  // Refresh cookie
  try {
    await setPreference(key, value);
  } catch {
    // Ignored
  }

  return value;
}

export async function setPreference(key: keyof Preferences, value: string) {
  const cookieContainer = await cookies();
  cookieContainer.set(preferences[key], value, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
}

export function getTheme() {
  return getPreference("theme", "light");
}

export type CalendarLayout = "RESPONSIVE" | "FIXED";

export function getCalendarLayout(): Promise<CalendarLayout> {
  return getPreference<CalendarLayout>("calendarLayout", "RESPONSIVE");
}
