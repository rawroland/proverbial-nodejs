FROM node:10.7-alpine

ADD . /app
WORKDIR /app

RUN npm install

CMD ["npm", "start"]
EXPOSE 3001
