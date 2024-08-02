import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { onCreateUser } from "./functions/user/onCreateUser";
import { prisma } from "./server/db/client";

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
        // Add the user id to the token
        token.id = user.id;
      }
      return token;
    },
  },
});
