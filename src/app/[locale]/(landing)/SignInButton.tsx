"use client";
import { signIn } from "next-auth/react";
import type { FC } from "react";

export const SignInButton: FC<{ id: string; label: string }> = ({
  id,
  label,
}) => {
  return (
    <button
      className="btn-outline-primary btn btn-lg bg-gradient-to-r from-pink-500 to-purple-600 shadow-2xl"
      onClick={() => signIn(id)}
    >
      <span className="px-16 text-xl font-semibold text-purple-950">
        {label}
      </span>
    </button>
  );
};
