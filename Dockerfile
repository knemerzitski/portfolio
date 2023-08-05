FROM node:18-alpine as base
WORKDIR /app

FROM base as modules
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

FROM base as build
COPY --from=modules /app/node_modules ./node_modules
COPY . .
COPY .env.prod.build .env.local

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base as prod
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  addgroup --system --gid 1001 nodejs; \
  adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public 
COPY --from=build --chown=1001:1001 /app/.next/standalone ./
COPY --from=build --chown=1001:1001 /app/.next/static ./.next/static

USER nextjs

ENV HOSTNAME localhost
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

