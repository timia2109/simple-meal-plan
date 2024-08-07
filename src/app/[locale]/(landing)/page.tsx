import { auth } from "@/auth";
import { InvitationHeader } from "@/components/invitation/InvitationHeader";
import { getInvitation } from "@/dal/user/getInvitation";
import { getScopedI18n } from "@/locales/server";
import { redirectRoute } from "@/routes";
import { FeatureBox } from "./FeatureBox";
import { getFeatures } from "./Features";
import { SignInButtons } from "./SignInButtons";

type Props = {
  searchParams: {
    invitationCode?: string;
  };
};

async function handleInvitation(
  invitationCode: string | undefined,
  isSignedIn: boolean
) {
  if (invitationCode === undefined) return undefined;

  const invitation = await getInvitation(invitationCode);

  if (isSignedIn) {
    redirectRoute("join", invitationCode);
  }

  return invitation;
}

export default async function LandingPage({ searchParams }: Props) {
  const t = await getScopedI18n("landing");

  const currentUser = await auth();
  const invitation = await handleInvitation(
    searchParams.invitationCode,
    currentUser != null
  );
  if (currentUser != null && invitation == null) redirectRoute("mealPlan");

  const features = await getFeatures();

  return (
    <div className="p-12">
      <title>{t("title")}</title>
      <div className="fw-bolder flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-6xl">
            {t("welcome")}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">
              {" "}
              {t("title")}
            </span>
          </h1>

          <p className="text-center text-xl md:w-1/2">{t("subtitle")}</p>
        </div>

        {invitation !== undefined && (
          <InvitationHeader invitation={invitation} />
        )}

        <SignInButtons />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureBox key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
