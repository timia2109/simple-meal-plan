// @ts-check
import { z } from "zod";

/**
 * This are the environment variables for the server.
 * You need to set them
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().describe("The URL to the database"),
  NODE_ENV: z.enum(["development", "test", "production"]),
  INVITATION_VALIDITY: z
    .string()
    .default("P30D")
    .describe("The duration of the invitation token"),
  SESSION_VALIDITY_IN_SECONDS: z
    .number()
    .default(60 * 60 * 24 * 30)
    .describe("Session validity"), // 30 days
  NEXTAUTH_SECRET: z.string().describe("The secret for next-auth"),
  ROOT_URL: z
    .string()
    .url()
    .optional()
    .describe("The root URL of the server. Used to generate invitation links"),
  ALLOW_ACCOUNT_LINKING: z.enum(["true", "false"]).default("false"),
  REDIRECT_PROXY_URL: z
    .string()
    .optional()
    .describe("The URL to the redirect proxy"),

  // auth-js Providers
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  AUTH_FACEBOOK_ID: z.string().optional(),
  AUTH_FACEBOOK_SECRET: z.string().optional(),
});

/**
 * This are the environment variables for the client.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_PRIVACY_URL: z
    .string()
    .optional()
    .describe("The URL to the privacy policy. Adds a point to the footer"),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_PRIVACY_URL: process.env.NEXT_PUBLIC_PRIVACY_URL,
};
