"use client";
import { signIn } from "next-auth/react";
import type { FC } from "react";

export const SignInButton: FC<{ id: string; label: string }> = ({
  id,
  label,
}) => {
  return (
    <button
      className="btn btn-outline btn-primary join-item btn-lg"
      onClick={() => signIn(id)}
    >
      {label}
    </button>
  );
};
