"use client";

import type { FC, PropsWithChildren } from "react";

type Props = {
  open?: boolean;
  modalRef?: React.RefObject<HTMLDialogElement>;
};

/** A generic modal which is directly open */
export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  open,
  modalRef,
}) => (
  <dialog className="modal" ref={modalRef} open={open}>
    <div className="modal-box">{children}</div>
  </dialog>
);
