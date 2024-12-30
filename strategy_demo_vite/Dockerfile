FROM node:23.5 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# 実行ステージ
FROM node:23.5-alpine

WORKDIR /app

# ビルドステージから必要なファイルだけをコピー
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN chown -R node:node ./

USER node

CMD ["npm", "dev"]
