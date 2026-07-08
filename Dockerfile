# syntax=docker/dockerfile:1.7
#
# Next.js standalone production image (Node runtime).
# Build context must include package.json, package-lock.json, next.config.ts,
# tsconfig.json, app/, components/, config/, data/, hooks/, styles/, public/.
#
# Build-time config (SITE_URL / SITE_NAME) is required because config/env.ts
# validates env via zod at build time (metadata, sitemap and robots are
# prerendered). Defaults target the production origin — override with
# --build-arg or docker-compose `build.args` for other environments.

# ---------- base ----------
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

# ---------- deps (cached unless package manifests change) ----------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- builder ----------
FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Build-time env consumed by next build (validated by config/env.ts).
ARG SITE_URL=https://inchapin.ru
ARG SITE_NAME=INCHAPIN
ENV SITE_URL=$SITE_URL
ENV SITE_NAME=$SITE_NAME

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- runner ----------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Runtime env (validated again by config/env.ts on boot). Overridable via
# `docker run -e` / docker-compose `environment`.
ARG SITE_URL=https://inchapin.ru
ARG SITE_NAME=INCHAPIN
ENV SITE_URL=$SITE_URL
ENV SITE_NAME=$SITE_NAME

# Non-root user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Standalone server: traced server.js + minimal node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
