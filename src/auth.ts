import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { onCreateUser } from "./functions/user/onCreateUser";
import { prisma } from "./server/db/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  events: {
    createUser: onCreateUser,
  },
  ...authConfig,
});
