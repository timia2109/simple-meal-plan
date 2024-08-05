/* eslint-disable @next/next/no-img-element */
/* We are using an SVG to show the github stars. Therefor we use the img tag */
import { getScopedI18n } from "@/locales/server";
import { env } from "../../env/client.mjs";

export async function Footer() {
  const t = await getScopedI18n("landing");

  return (
    <footer
      className=" w-full border-t border-gray-200
    bg-white p-4 text-white shadow md:flex 
    md:items-center md:justify-between md:p-6 dark:border-gray-600 dark:bg-gray-800"
    >
      <div>
        {t("title")}
        <a
          href="https://timitt.dev"
          target="_blank"
          rel="noreferrer"
          className="link-hover link ms-1"
        >
          {t("author")}
        </a>
      </div>
      {env.NEXT_PUBLIC_PRIVACY_URL && (
        <a className="link-hover" href={env.NEXT_PUBLIC_PRIVACY_URL}>
          {t("privacy")}
        </a>
      )}
      <div>
        <a
          href="https://github.com/timia2109/simple-meal-plan"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="GitHub Repo stars"
            src="https://img.shields.io/github/stars/timia2109/simple-meal-plan?style=social"
            width={76}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
}
