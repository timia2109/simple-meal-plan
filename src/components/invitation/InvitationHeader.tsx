import type { InvitationReturn } from "@/dal/user/getInvitation";
import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { getI18n, getScopedI18n } from "@/locales/server";
import {
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  /** getInvitation Result */
  invitation: InvitationReturn;
  /** Don't show anything on valid invitations */
  hideOnSuccess?: boolean;
};

export async function InvitationHeader({ invitation, hideOnSuccess }: Props) {
  const t = await getScopedI18n("invitation");

  if (invitation.result == "NOT_FOUND")
    return (
      <div role="alert" className="alert alert-error">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="h-6 w-6 shrink-0 stroke-current"
        />
        <span>{t("notFound")}</span>
      </div>
    );

  if (invitation.result == "EXPIRED")
    return (
      <div role="alert" className="alert alert-error">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="h-6 w-6 shrink-0 stroke-current"
        />
        <span>{t("expired")}</span>
      </div>
    );

  if (hideOnSuccess) return <></>;

  return (
    <div role="alert" className="alert alert-info">
      <FontAwesomeIcon
        icon={faInfoCircle}
        className="h-6 w-6 shrink-0 stroke-current"
      />
      <div>
        <h1 className="text-xl">
          {t("loginToJoinTitle", {
            name: invitation.invitation.user.name ?? t("unknownUser"),
            mealPlanTitle: await getMealPlanLabel(
              invitation.invitation.mealPlan,
              await getI18n()
            ),
          })}
        </h1>
        <p>{t("loginToJoinSubtitle")}</p>
      </div>
    </div>
  );
}
