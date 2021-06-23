FROM node:16-alpine3.11

ENV NODE_ENV=production

WORKDIR /front/
COPY package*.json .
RUN npm install

COPY . .
COPY *.config.js .

RUN npm run build

EXPOSE 3000
CMD [ "node", "build/index.js" ]
