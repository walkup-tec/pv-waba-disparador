FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json bun.lock* package-lock.json* ./
RUN npm install --no-audit --no-fund

COPY . .

ARG VITE_WABA_API_URL=https://waba.draxsistemas.com.br
ARG VITE_WABA_APP_LOGIN_URL=https://waba.draxsistemas.com.br/
ENV VITE_WABA_API_URL=$VITE_WABA_API_URL
ENV VITE_WABA_APP_LOGIN_URL=$VITE_WABA_APP_LOGIN_URL

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app/.output ./.output

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/ || exit 1

CMD ["node", ".output/server/index.mjs"]
