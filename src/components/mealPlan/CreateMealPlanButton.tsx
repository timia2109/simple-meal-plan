"use client";

import { createMealPlanAction } from "@/actions/createMealPlanAction";
import { useScopedI18n } from "@/locales/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { createRef } from "react";
import { FormModal } from "../common/Modal";

export const CreateMealPlanButton: FC = () => {
  const dialogRef = createRef<HTMLDialogElement>();
  const t = useScopedI18n("manageMealPlans");

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="btn btn-outline btn-primary"
      >
        <FontAwesomeIcon icon={faPlus} /> {t("create")}
      </button>
      <FormModal
        modalRef={dialogRef}
        cancelContent={t("cancel")}
        heading={t("createMealPlan")}
        submitContent={t("create")}
        action={createMealPlanAction}
      >
        <label className="input input-bordered flex items-center gap-2">
          {t("name")}
          <input
            name="mealPlanName"
            type="text"
            className="grow"
            placeholder={t("new")}
          />
        </label>
      </FormModal>
    </>
  );
};
