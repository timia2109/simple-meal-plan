import { type GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

const desiredName = "next-auth.session-token";
const authType = "Bearer ";

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  // Hack to also allow Bearer Tokens
  const authHeader = ctx.req.headers["authorization"];
  if (authHeader !== undefined && authHeader?.indexOf(authType) !== -1) {
    const token = authHeader?.substring(authType.length);
    ctx.req.cookies[desiredName] = token;
  }

  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
};
