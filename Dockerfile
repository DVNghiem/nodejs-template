FROM node:16.16.0-alpine

RUN mkdir /node/
WORKDIR /node
COPY . /node/
RUN cd /node/
RUN npm i
RUN npm run build
ENV NODE_ENV production
CMD [ "npm", "run", "start"]