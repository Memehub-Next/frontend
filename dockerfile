FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm i --production

COPY . ./

RUN npm build
CMD [ "npm", "start" ]