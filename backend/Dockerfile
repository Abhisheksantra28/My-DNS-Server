FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5000
EXPOSE 53/udp

CMD [ "node", "index.js" ]

ENV MONGO_URI=$[MONGO_URI]