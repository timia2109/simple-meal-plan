import { Heading } from "@/components/common/Heading";
import { SocialShareLinks } from "@/components/common/SocialShareLinks";
import { createMealPlanInvitation } from "@/dal/mealPlans/createMealPlanInvitation";
import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { getUserId } from "@/functions/user/getUserId";
import { getScopedI18n } from "@/locales/server";
import { getRouteUrl } from "@/routes";
import { notFound } from "next/navigation";

type Props = {
  params: {
    mealPlanId: string;
  };
};

export default async function InvitePage({ params }: Props) {
  const userId = await getUserId(true);
  const mealPlan = await getMealPlan(userId, params.mealPlanId);
  if (mealPlan == null) notFound();

  const t = await getScopedI18n("invite");

  const invitation = await createMealPlanInvitation(params.mealPlanId, userId);

  const invitationLink = getRouteUrl(
    "invitationLink",
    invitation.invitationCode
  );

  return (
    <div className="container mx-auto">
      <Heading>{t("invite", mealPlan)}</Heading>
      <p>{t("inviteMessage")}</p>
      <p>{t("inviteHint")}</p>
      <div className="cursor-grab select-all rounded-sm bg-indigo-50 px-1 text-lg text-indigo-950">
        <code>{invitationLink.toString()}</code>
      </div>
      <div className="mt-3">
        <SocialShareLinks
          messagePayload={t("shareText", {
            invitationLink: invitationLink.toString(),
          })}
        />
      </div>
    </div>
  );
}
