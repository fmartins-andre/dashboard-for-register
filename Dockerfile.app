FROM node:16-alpine
WORKDIR /app
COPY ./packages/client/package.json ./
COPY ./packages/client/index.html ./
COPY ./packages/client/tsconfig.json ./
COPY ./packages/client/vite.config.ts ./
COPY ./yarn.lock ./
COPY ./packages/client/src ./src
COPY ./.env ./
RUN cd /app && yarn install --frozen-lockfile && yarn build
CMD [ "yarn", "serve", "--host", "--port", "3000" ]