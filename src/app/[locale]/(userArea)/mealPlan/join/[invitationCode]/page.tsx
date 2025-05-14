import { ProfileImage } from "@/components/common/ProfileImage";
import { InvitationHeader } from "@/components/invitation/InvitationHeader";
import { getInvitation } from "@/dal/user/getInvitation";
import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { getUserId } from "@/functions/user/getUserId";
import { getI18n, getScopedI18n } from "@/locales/server";
import { Page } from "@/PageProps";
import { redirectRoute } from "@/routes";
import { AcceptButton } from "./AcceptButton";

const InvitationPage: Page<{ invitationCode: string }> = async ({ params }) => {
  const { invitationCode } = await params;
  const userId = await getUserId(true);
  const invitation = await getInvitation(invitationCode, userId);

  // Redirect if joined
  if (invitation.result === "JOINED") {
    await redirectRoute("mealPlan", invitation.invitation.mealPlan.id);
    return;
  }

  const t = await getScopedI18n("invitation");
  const mealPlanTitle =
    invitation.result === "OK"
      ? await getMealPlanLabel(invitation.invitation.mealPlan, await getI18n())
      : "";

  return (
    <div className="container mx-auto flex justify-center align-middle">
      <InvitationHeader invitation={invitation} hideOnSuccess />
      {invitation.result === "OK" && (
        <div className="card bg-base-100 w-96 shadow-xl">
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
};

export default InvitationPage;
