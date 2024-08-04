import { SocialShareLinks } from "@/components/common/SocialShareLinks";
import { createMealPlanInvitation } from "@/dal/mealPlans/createMealPlanInvitation";
import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { buildUrl } from "@/functions/buildUrl";
import { getUserId } from "@/functions/user/getUserId";
import { getScopedI18n } from "@/locales/server";
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

  const invitationLink = buildUrl({
    path: "/",
    search: {
      invitationCode: invitation.invitationCode,
    },
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">{t("invite", mealPlan)}</h1>
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
