import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { onCreateUser } from "./functions/user/onCreateUser";
import { db } from "./server/db";
import type { User } from "./server/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
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
