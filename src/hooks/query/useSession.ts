import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

/** Hook to get the current session */
export const useSession = () => useQuery(["session"], () => getSession());
