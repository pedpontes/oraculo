# Etapa 1: build do TypeScript
FROM node:latest AS build

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Etapa 2: imagem final
FROM node:latest

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .

ENV NODE_ENV=production
CMD ["node", "dist/main/main.js"]
