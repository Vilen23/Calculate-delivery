FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx prisma generate

COPY . .

CMD ["node","dist/index.js"]
