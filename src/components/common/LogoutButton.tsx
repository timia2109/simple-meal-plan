"use client";

import { useScopedI18n } from "@/locales/client";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const t = useScopedI18n("landing");

  return <button onClick={() => signOut()}>{t("logout")}</button>;
};
