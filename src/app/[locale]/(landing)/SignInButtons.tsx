import { authConfig } from "@/auth.config";
import { getScopedI18n } from "@/locales/server";
import type { OAuth2Config } from "next-auth/providers";
import { SignInButton } from "./SignInButton";

export async function SignInButtons() {
  const t = await getScopedI18n("landing");

  return (
    <div className="join">
      {Object.values(authConfig.providers as OAuth2Config<unknown>[]).map(
        (d) => (
          <SignInButton key={d.id} id={d.id} label={t("signinWith", d)} />
        )
      )}
    </div>
  );
}
