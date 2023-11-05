FROM node:20

WORKDIR /usr/src/app

EXPOSE 8080

ENV NODE_ENV development

COPY package*.json ./

RUN npm install -g typescript

RUN npm install

ENV NODE_ENV production

COPY . .

CMD ["npm", "start"]
