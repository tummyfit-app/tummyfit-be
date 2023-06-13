FROM node:16.13.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run init:prod

CMD [ "npm" , "run", "start:prod" ]