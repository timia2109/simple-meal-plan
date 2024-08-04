import { Heading } from "@/components/common/Heading";
import { getTheme } from "@/functions/user/preferences";
import { getScopedI18n } from "@/locales/server";
import { SelectableTheme } from "./SelectableTheme";

const themes = [
  "light",
  "dark",
  "synthwave",
  "cyberpunk",
  "aqua",
  "wireframe",
  "nord",
  "jenin",
];

export default async function ProfilePage() {
  const t = await getScopedI18n("profile");
  const currentTheme = getTheme();

  return (
    <div>
      <Heading>{t("settings")}</Heading>
      <div className="grid grid-cols-2 gap-1">
        <div>
          <p className="font-bold">{t("theme")}</p>
          <p>
            {t("themeFooter")}
            <a className="link" href="https://daisyui.com/">
              DaisyUI
            </a>
          </p>
        </div>
        <form>
          <div className="join join-vertical">
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
    </div>
  );
}
