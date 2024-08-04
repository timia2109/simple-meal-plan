import { auth } from "@/auth";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";

type AppSession = Session & {
  userId: string;
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
    if (withRedirection === true) redirect("/");
    if (withRedirection === null) throw new Error("User not found");
    return null;
  }

  return (user as AppSession).userId;
}
