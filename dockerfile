FROM node:20 AS base

FROM base AS builder
WORKDIR /app
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1 SKIP_ENV_VALIDATION=1

# SET DUMMY VALUES FOR BUILD
ENV DATABASE_URL=CHANGE_ME
ENV GOOGLE_CLIENT_ID=CHANGE_ME
ENV GOOGLE_CLIENT_SECRET=CHANGE_ME
ENV NEXTAUTH_SECRET=CHANGE_ME

RUN corepack enable pnpm && pnpm i --frozen-lockfile && pnpm run build

# ================================#
# PROD
# ================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --chown=nextjs:nodejs prisma ./prisma/

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
RUN npm install prisma

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs ./init.sh .

USER nextjs

EXPOSE 3000

ENV PORT=3000 HOSTNAME=0.0.0.0
ENTRYPOINT [ "/bin/sh", "./init.sh" ]