"use client";

import type { FC, PropsWithChildren } from "react";
import { Heading } from "./Heading";

type Props = {
  modalRef?: React.RefObject<HTMLDialogElement>;
};

/** A generic modal */
export const Modal: FC<PropsWithChildren<Props>> = ({ children, modalRef }) => (
  <dialog className="modal" ref={modalRef}>
    <div className="modal-box">{children}</div>
  </dialog>
);

type FormModalProps = {
  submitContent: string;
  cancelContent: string;
  heading: string;
  modalRef: React.RefObject<HTMLDialogElement>;
  action?: string | ((formData: FormData) => void) | undefined;
};

export const FormModal: FC<PropsWithChildren<FormModalProps>> = ({
  cancelContent,
  submitContent,
  action,
  children,
  heading,
  modalRef,
}) => {
  return (
    <Modal modalRef={modalRef}>
      <Heading>{heading}</Heading>
      <form method="dialog">
        {children}

        <div className="modal-action">
          <button
            type="submit"
            onClick={() => modalRef.current?.close()}
            className="btn btn-primary"
            formAction={action}
          >
            {submitContent}
          </button>
          <button type="submit" className="btn btn-outline btn-secondary ">
            {cancelContent}
          </button>
        </div>
      </form>
    </Modal>
  );
};
