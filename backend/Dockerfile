FROM node:22.17.0-slim

# 日本語ロケールおよびJSTに設定
RUN apt-get update && \
    apt-get install -y locales curl procps
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

# pnpm を有効化
RUN corepack enable

RUN mkdir -p /usr/src/app/generated/prisma-nestjs-graphql && chown -R node:node /usr/src/app/generated
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app/node_modules

USER node

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm config set store-dir /home/node/.local/share/pnpm/store/v10 --global

# --frozen-lockfile 指定で、pnpm-lock.yaml に基づいてインストール
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

EXPOSE 3200

CMD ["pnpm", "run", "start:dev"]
