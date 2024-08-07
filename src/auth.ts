import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { onCreateUser } from "./functions/user/onCreateUser";
import { prisma } from "./server/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  events: {
    createUser: onCreateUser,
  },
  callbacks: {
    ...authConfig.callbacks,
    jwt: async (props) => {
      const { token, user } = props;
      if (user) {
        const appUser = user as User;
        token.id = user.id;
        token.role = appUser.role;
      }
      return token;
    },
  },
});
