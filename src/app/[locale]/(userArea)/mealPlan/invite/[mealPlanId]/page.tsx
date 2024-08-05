import { Heading } from "@/components/common/Heading";
import { ProfileImage } from "@/components/common/ProfileImage";
import { SocialShareLinks } from "@/components/common/SocialShareLinks";
import { createMealPlanInvitation } from "@/dal/mealPlans/createMealPlanInvitation";
import { getMealPlan } from "@/dal/mealPlans/getMealPlan";
import { getMealPlanUsers } from "@/dal/mealPlans/getMealPlanUsers";
import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { getUserId } from "@/functions/user/getUserId";
import { getI18n, getScopedI18n } from "@/locales/server";
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

  const mealPlanTitle = await getMealPlanLabel(mealPlan, await getI18n());
  const users = await getMealPlanUsers(params.mealPlanId);

  return (
    <div className="container mx-1 md:mx-auto">
      <title>{t("invite", { title: mealPlanTitle })}</title>
      <div className="grid md:grid-cols-2">
        <div className="order-2 md:order-1">
          <Heading>{mealPlanTitle}</Heading>
          <p className="text-xl">{t("members")}</p>
          <div className="py-3 pe-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-start gap-2 border-e border-s border-t border-accent p-3 first:rounded-t last:rounded-b last:border-b"
              >
                <ProfileImage user={user} />
                {user.name}
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Heading>{t("invite", { title: mealPlanTitle })}</Heading>
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
      </div>
    </div>
  );
}
