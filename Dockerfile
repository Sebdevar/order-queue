FROM node:24-alpine AS base
EXPOSE 3000

######### BUILD #########
FROM node:24-alpine AS build

WORKDIR /app

COPY --link package*.json ./
RUN npm ci

COPY --link tsconfig.json ./
COPY --link src ./src
RUN npm run build

######### BASE #########
FROM base

WORKDIR /app

COPY --link package*.json ./
RUN npm ci --only=production

COPY --link --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

ENTRYPOINT ["node", "dist/index.js"]
