"use server";
import { getMealPlanUsers } from "@/dal/mealPlans/getMealPlanUsers";
import { getMealPlanLabel } from "@/functions/user/getMealPlanLabel";
import { getI18n } from "@/locales/server";
import { getRoute } from "@/routes";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MealPlan, MealPlanAssignment } from "@prisma/client";
import classNames from "classnames";
import Link from "next/link";
import { ProfileImage } from "../common/ProfileImage";
import { MealPlanActions } from "./MealPlanActions";

type BasicProps = {
  mealPlan: MealPlan;
  withUsers?: boolean;
};

type WithActionsProps = BasicProps & {
  withActions: true;
  mealPlanAssignment: MealPlanAssignment;
};

type WithUsersProps = BasicProps & {
  withUsers: true;
  withActions?: false;
  mealPlanAssignment?: MealPlanAssignment;
};

type Props = WithActionsProps | WithUsersProps;

export async function MealPlanComponent({
  mealPlan,
  mealPlanAssignment,
  withActions,
  withUsers,
}: Props) {
  const t = await getI18n();

  const users = withUsers ? await getMealPlanUsers(mealPlan.id) : [];

  return (
    <div
      className={classNames({
        "grid justify-between gap-4": true,
        "border-e border-s border-t border-accent p-3 first:rounded-t last:rounded-b last:border-b":
          true,
        "lg:grid-cols-4": withActions,
        "lg:grid-cols-3": !withActions,
        "grid-cols-1 md:grid-cols-2": true,
      })}
    >
      <Link
        className="btn btn-ghost w-full justify-start text-start text-xl lg:col-span-2"
        href={getRoute("mealPlan", mealPlan.id)}
      >
        {getMealPlanLabel(mealPlan, t)}
        {mealPlanAssignment?.userDefault && (
          <span className="badge badge-primary ms-1">
            <FontAwesomeIcon icon={faCrown} className="me-1" />
            {t("manageMealPlans.primary")}
          </span>
        )}
      </Link>

      <div className="md:justify-self-end lg:justify-self-center lg:last:justify-self-end">
        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          {users.map((user) => (
            <ProfileImage key={user.id} user={user} />
          ))}
        </div>
      </div>

      {withActions && (
        <div className="lg:last:justify-self-end">
          <MealPlanActions
            mealPlan={mealPlan}
            mealPlanAssignment={mealPlanAssignment}
          />
        </div>
      )}
    </div>
  );
}
