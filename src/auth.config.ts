import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import { env } from "./env/server.mjs";

const providers: Provider[] = [];

if (env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: env.ALLOW_ACCOUNT_LINKING === "true",
    })
  );
}

if (env.AUTH_FACEBOOK_ID && env.AUTH_FACEBOOK_SECRET) {
  providers.push(
    Facebook({
      clientId: env.AUTH_FACEBOOK_ID,
      clientSecret: env.AUTH_FACEBOOK_SECRET,
      allowDangerousEmailAccountLinking: env.ALLOW_ACCOUNT_LINKING === "true",
    })
  );
}

export const authConfig: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  redirectProxyUrl: env.REDIRECT_PROXY_URL,
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
  providers,
};
