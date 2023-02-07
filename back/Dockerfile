FROM node:19.4

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]
