import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { env } from "../../env/client.mjs";

export const Footer: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <footer
      className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-200
    bg-white p-4 text-white shadow dark:border-gray-600 
    dark:bg-gray-800 md:flex md:items-center md:justify-between md:p-6"
    >
      <div>
        {t("productName")}
        <a
          href="https://timitt.dev"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 transition-all hover:font-bold
            hover:text-orange-500"
        >
          {t("author")}
        </a>
      </div>
      {env.NEXT_PUBLIC_PRIVACY_URL && (
        <a href={env.NEXT_PUBLIC_PRIVACY_URL}>{t("privacy")}</a>
      )}
      <div>
        <a
          href="https://github.com/timia2109/simple-meal-plan"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="GitHub Repo stars"
            src="https://img.shields.io/github/stars/timia2109/simple-meal-plan?style=social"
            width={76}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
};
