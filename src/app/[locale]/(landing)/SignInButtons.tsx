import { authConfig } from "@/auth.config";
import { getScopedI18n } from "@/locales/server";
import { SignInButton } from "./SignInButton";

export async function SignInButtons() {
  const t = await getScopedI18n("landing");

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {Object.values(authConfig.providers).map((d) => (
        <SignInButton key={d.id} id={d.id} label={t("signinWith", d)} />
      ))}
    </div>
  );
}
