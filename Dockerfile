FROM node:16-alpine as builder

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build \
  && npm i


FROM node:16-alpine as production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/

RUN npm install -g ts-node
EXPOSE 3000