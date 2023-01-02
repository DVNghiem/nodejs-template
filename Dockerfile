FROM node:16.16.0-alpine

RUN mkdir /node/
WORKDIR /node
COPY . /node/
RUN cd /node/
RUN chmod +x wait-for-it.sh
RUN npm i
RUN npm i -g pm2
RUN npm run build
