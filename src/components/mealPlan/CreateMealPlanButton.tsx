"use client";

import { createMealPlanAction } from "@/actions/createMealPlanAction";
import { useScopedI18n } from "@/locales/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { createRef } from "react";
import { Heading } from "../common/Heading";
import { Modal } from "../common/Modal";

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
      <Modal modalRef={dialogRef}>
        <Heading>{t("createMealPlan")}</Heading>
        <form method="dialog" action={createMealPlanAction}>
          <label className="input input-bordered flex items-center gap-2">
            {t("name")}
            <input
              name="mealPlanName"
              type="text"
              className="grow"
              placeholder={t("new")}
            />
          </label>

          <div className="modal-action">
            <div className="join">
              <button
                type="submit"
                onClick={() => dialogRef.current?.close()}
                className="btn btn-primary join-item"
              >
                {t("create")}
              </button>
              <button
                type="reset"
                onClick={() => dialogRef.current?.close()}
                className="btn btn-outline btn-secondary join-item"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
