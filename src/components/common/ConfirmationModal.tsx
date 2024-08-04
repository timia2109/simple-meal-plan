"use client";

import { useScopedI18n } from "@/locales/client";
import type { FC, PropsWithChildren } from "react";
import { Modal } from "./Modal";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

/** Generic confirm modal. Gets visible, when its rendered */
export const ConfirmationModal: FC<PropsWithChildren<Props>> = ({
  children,
  onCancel,
  onConfirm,
}) => {
  const t = useScopedI18n("confirmModal");

  return (
    <Modal open>
      {children}
      <div className="modal-action">
        <form method="dialog">
          <div className="join">
            <button className="btn btn-primary join-item" onClick={onConfirm}>
              {t("confirm")}
            </button>
            <button
              className="btn btn-outline btn-secondary join-item"
              onClick={onCancel}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
