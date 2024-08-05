import { cookies } from "next/headers";

export const themeKey = "smp-theme";
export const calendarLayoutKey = "smp-calendar";

const preferences = {
  theme: "smp-theme",
  calendarLayout: "smp-calendar",
};

type Preferences = typeof preferences;

function getPreference<TValue extends string>(
  key: keyof Preferences,
  defaultValue?: TValue
): TValue {
  const cookieContainer = cookies();
  const value =
    (cookieContainer.get(preferences[key])?.value as TValue) ?? defaultValue;

  // Refresh cookie
  try {
    setPreference(key, value);
  } catch {
    // Ignored
  }

  return value;
}

export function setPreference(key: keyof Preferences, value: string) {
  const cookieContainer = cookies();
  cookieContainer.set(preferences[key], value, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
}

export function getTheme() {
  return getPreference("theme");
}

export type CalendarLayout = "RESPONSIVE" | "FIXED";

export function getCalendarLayout(): CalendarLayout {
  return getPreference<CalendarLayout>("calendarLayout", "RESPONSIVE");
}
