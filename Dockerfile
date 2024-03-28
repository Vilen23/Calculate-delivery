FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx prisma generate --schema=/app/prisma/schema.prisma


COPY . .

CMD ["node","dist/index.js"]
