FROM node:latest

WORKDIR /app/

COPY package.json .

RUN npm install

COPY . .

RUN npm run test

RUN npm run build

ENTRYPOINT [ "npm run start" ]