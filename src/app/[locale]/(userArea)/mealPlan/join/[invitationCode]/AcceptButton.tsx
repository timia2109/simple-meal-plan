"use client";

import { acceptInvitationAction } from "@/actions/acceptInvitationAction";
import type { FC, PropsWithChildren } from "react";

type Props = {
  invitationCode: string;
};

export const AcceptButton: FC<PropsWithChildren<Props>> = ({
  invitationCode,
  children,
}) => (
  <button
    className="btn btn-primary"
    onClick={() => acceptInvitationAction(invitationCode)}
  >
    {children}
  </button>
);
