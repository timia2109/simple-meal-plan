import { notFound } from "next/navigation";
import { getUserRole } from "./getUserId";

/**
 * Ensures that the current user is an Admin, else it will throw a 404 error.
 */
export async function ensureIsAdmin(): Promise<void> {
  const role = await getUserRole();

  if (role != "Admin") notFound();
}
