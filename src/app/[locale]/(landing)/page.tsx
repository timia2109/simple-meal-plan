import { auth } from "@/auth";
import { InvitationHeader } from "@/components/invitation/InvitationHeader";
import { getInvitation } from "@/dal/user/getInvitation";
import { redirectWithLocale } from "@/functions/user/redirectWithLocale";
import { getScopedI18n } from "@/locales/server";
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
    // Redirect to join page
    redirectWithLocale(`/mealPlan/join/${invitationCode}`);
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
  if (currentUser != null && invitation == null)
    redirectWithLocale(`/mealPlan`);

  return (
    <div className="p-12">
      <div className="fw-bolder flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-8 ">
          <h1 className="text-6xl">
            {t("welcome")}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text font-semibold text-transparent">
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
          <div className="card w-96 bg-base-300 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title flex justify-center">
                Feature Heading
              </h2>
              <p>Feature Box</p>
            </div>
          </div>

          <div className="card w-96 bg-base-300 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title flex justify-center">Search Params</h2>
              <p>
                <code>{JSON.stringify(searchParams)}</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
