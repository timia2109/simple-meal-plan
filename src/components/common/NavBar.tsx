import { auth } from "@/auth";
import { getMealPlans } from "@/dal/mealPlans/getMealPlans";
import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { getUserId } from "@/functions/user/getUserId";
import { getLinkWithLocale } from "@/functions/user/redirectWithLocale";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProfileImage } from "./ProfileImage";

async function InnerMenu() {
  const mealPlans = await getMealPlans(await getUserId(true));
  const t = await getI18n();

  return (
    <>
      <li>
        <details>
          <summary>{t("landing.myMealPlans")}</summary>
          <ul className="p-2">
            {mealPlans.map((mealPlan) => (
              <li key={mealPlan.mealPlanId}>
                <Link
                  href={
                    mealPlan.userDefault
                      ? getLinkWithLocale("/mealPlan")
                      : getLinkWithLocale(`/mealPlan/${mealPlan.mealPlanId}`)
                  }
                >
                  {getMealPlanLabel(mealPlan.mealPlan, t)}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
      <li>
        <Link href={getLinkWithLocale("/manage")}>
          {t("manageMealPlans.manage")}
        </Link>
      </li>
    </>
  );
}

export async function NavBar() {
  const currentUser = await auth();
  if (currentUser == null) redirect("/");

  const t = await getI18n();

  return (
    <div className="navbar mb-3 bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <InnerMenu />
          </ul>
        </div>
        <Link
          href={getLinkWithLocale("/mealPlan")}
          className="btn btn-ghost text-xl"
        >
          {t("landing.title")}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <InnerMenu />
        </ul>
      </div>
      <div className="navbar-end">
        {currentUser.user && <ProfileImage user={currentUser.user} size={40} />}
      </div>
    </div>
  );
}
