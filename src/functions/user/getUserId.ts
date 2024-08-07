import { auth } from "@/auth";
import type { UserRole } from "@prisma/client";
import type { Session } from "next-auth";
import { redirectRoute } from "../../routes";

export type AppSession = Session & {
  userId: string;
  role: UserRole;
};

/** Gets the current UserId (or null if there is no user) */
export async function getUserId(): Promise<string | null>;
/** Gets the current UserId (or redirects if there is no user) */
export async function getUserId(withRedirection: true): Promise<string>;
/** Gets the current UserId (or throws an Error) */
export async function getUserId(throwException: null): Promise<string>;
export async function getUserId(withRedirection: boolean | null = false) {
  const user = await auth();

  if (user == null) {
    if (withRedirection === true) redirectRoute("home");
    if (withRedirection === null) throw new Error("User not found");
    return null;
  }

  return (user as AppSession).userId;
}

export async function getUserRole(): Promise<UserRole> {
  const user = await auth();
  if (user == null) return "User";

  return (user as AppSession).role;
}
