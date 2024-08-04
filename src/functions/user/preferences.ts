import { cookies } from "next/headers";

export const themeKey = "smp-theme";

export function getTheme() {
  const cookieContainer = cookies();
  return cookieContainer.get(themeKey)?.value;
}
