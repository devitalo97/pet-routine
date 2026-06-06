# 1. Trocamos para a versão Alpine (MUITO mais leve que a latest)
FROM oven/bun:1.3.14-alpine AS base
WORKDIR /app

FROM base AS prepare
RUN bun add -g turbo@2.9.16
COPY . .
RUN turbo prune front-end --docker

# ---
FROM base AS builder
COPY --from=prepare /app/out/json/ .
RUN bun install
COPY --from=prepare /app/out/full/ .
COPY apps/front-end/.env.local ./apps/front-end/.env.production
RUN bun run build

# ---
FROM base AS runner
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000
COPY --from=builder /app/ .
WORKDIR /app/apps/front-end
CMD ["bun", "run", "start"]
