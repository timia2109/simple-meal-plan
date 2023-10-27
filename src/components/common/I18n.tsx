import { useTranslation } from "next-i18next";
import React from "react";

type Props = {
  key: string;
  scope?: string;
};

export const I18n: React.FC<Props> = ({ key, scope }) => {
  const { t } = useTranslation(scope ?? "common");

  return <>{t(key)}</>;
};
