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
ENV HOST=0.0.0.0
ENV NITRO_HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
