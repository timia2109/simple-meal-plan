import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./env/server.mjs";

export const authConfig: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: env.SESSION_VALIDITY_IN_SECONDS,
    strategy: "jwt",
  },
  callbacks: {
    async session(props) {
      const { session, token } = props;
      session.userId = token.id as string;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
