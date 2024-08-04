import { acceptInvitationAction } from "@/actions/acceptInvitationAction";
import { ProfileImage } from "@/components/common/ProfileImage";
import { InvitationHeader } from "@/components/invitation/InvitationHeader";
import { getInvitation } from "@/dal/user/getInvitation";
import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { getUserId } from "@/functions/user/getUserId";
import { redirectWithLocale } from "@/functions/user/redirectWithLocale";
import { getI18n, getScopedI18n } from "@/locales/server";
import { AcceptButton } from "./AcceptButton";

type Props = {
  params: {
    invitationCode: string;
  };
};

export default async function InvitationPage({ params }: Props) {
  const userId = await getUserId(true);
  const invitation = await getInvitation(params.invitationCode, userId);

  // Redirect if joined
  if (invitation.result === "JOINED") {
    redirectWithLocale(`/mealPlan/${invitation.invitation.mealPlan.id}`);
  }

  const t = await getScopedI18n("invitation");
  const mealPlanTitle =
    invitation.result === "OK"
      ? await getMealPlanLabel(invitation.invitation.mealPlan, await getI18n())
      : "";

  const acceptAction =
    invitation.result === "OK"
      ? acceptInvitationAction.bind(null, invitation.invitation.invitationCode)
      : undefined;

  return (
    <div className="container mx-auto flex justify-center align-middle">
      <InvitationHeader invitation={invitation} hideOnSuccess />
      {invitation.result === "OK" && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="flex justify-center pt-1">
            <ProfileImage user={invitation.invitation.user} />
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{t("header")}</h2>
            <p>
              {t("loginToJoinTitle", {
                mealPlanTitle,
                name: invitation.invitation.user.name ?? t("unknownUser"),
              })}
            </p>
            <div className="card-actions">
              <AcceptButton
                invitationCode={invitation.invitation.invitationCode}
              >
                {t("accept", {
                  mealPlanTitle,
                })}
              </AcceptButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
