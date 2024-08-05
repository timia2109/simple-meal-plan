import { daisyui } from "@/../tailwind.config.cjs";
import { Heading } from "@/components/common/Heading";
import { getCalendarLayout, getTheme } from "@/functions/user/preferences";
import { getScopedI18n } from "@/locales/server";
import type { CustomTheme, Theme } from "daisyui";
import { CalendarLayoutSelection } from "./CalendarLayoutSelection";
import { SelectableTheme } from "./SelectableTheme";

const themes = (daisyui.themes! as (Theme | CustomTheme)[]).flatMap((t) => {
  if (typeof t === "string") {
    return [t];
  } else {
    return Object.keys(t);
  }
});

export default async function ProfilePage() {
  const t = await getScopedI18n("profile");
  const currentTheme = getTheme();
  const currentCalendarLayout = getCalendarLayout();

  return (
    <>
      <Heading>{t("settings")}</Heading>
      <p className="mb-3">{t("deviceSettings")}</p>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <p className="font-bold">{t("calendarLayout")}</p>
          <p>{t("calendarLayoutFooter")}</p>
        </div>
        <CalendarLayoutSelection current={currentCalendarLayout} />

        <div className="mt-3">
          <p className="font-bold">{t("theme")}</p>
          <p>
            {t("themeFooter")}
            <a className="link" href="https://daisyui.com/">
              DaisyUI
            </a>
          </p>
        </div>
        <form className="mt-3 w-full">
          <div className="join join-vertical w-full">
            {themes.map((theme) => (
              <SelectableTheme
                key={theme}
                theme={theme}
                active={theme == currentTheme}
              />
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
