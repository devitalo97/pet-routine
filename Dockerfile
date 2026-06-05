# 1. Trocamos para a versão Alpine (MUITO mais leve que a latest)
FROM oven/bun:1.3.14-alpine AS base
WORKDIR /app

# Etapa 1: Isolar o app alvo usando o Turborepo
FROM base AS pruner
RUN bun add -g turbo@2.9.16
COPY . .
# Gera a pasta ./out com apenas o necessário para o front-end
RUN turbo prune front-end --docker

# Etapa 2: Instalar TODAS as dependências (dev + prod) para conseguir fazer o build
FROM base AS installer
COPY --from=pruner /app/out/json/ .
RUN bun install

# Etapa 3: Buildar o projeto e LIMPAR lixo
FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

# Executa o build
RUN bunx turbo run build --filter=front-end...

# A MÁGICA DA OTIMIZAÇÃO ACONTECE AQUI:
# Após o build, apagamos as pastas node_modules gigantes e instalamos APENAS o que é necessário para rodar em produção
RUN rm -rf node_modules apps/*/node_modules packages/*/node_modules && \
    bun install --production

# Etapa 4: Runner final (Imagem de produção ultra leve)
FROM base AS runner

# Variáveis essenciais para produção
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000

# Agora quando copiamos do builder, estamos copiando uma pasta /app magrinha
COPY --from=builder /app/ .

# Define o working directory para o front-end
WORKDIR /app/apps/front-end

# Inicia o servidor
CMD ["bun", "run", "start"]
