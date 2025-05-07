FROM node:20.15.0-alpine AS base

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

# Enable corepack and use pnpm
RUN npm install -g pnpm@latest && pnpm --version
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN pnpm install turbo@2.4.2 --global

COPY . .

# Run turbo prune using local turbo (from package.json)

RUN pnpm exec turbo prune backend --docker

FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g pnpm@latest && pnpm --version

COPY --from=builder /app/out/json/ ./

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ ./

RUN pnpm exec turbo run build --filter=backend...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 fastify
RUN adduser --system --uid 1001 fastify
USER fastify

COPY --from=installer /app ./

CMD node_modules/.bin/tsx apps/backend/dist/src/main.js