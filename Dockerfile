# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production \
	HOST=0.0.0.0 \
	PORT=3000

RUN groupadd --system app \
	&& useradd --system --gid app --create-home --home-dir /app app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev \
	&& chown -R app:app /app

COPY --from=builder --chown=app:app /app/.output ./.output

USER app

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
