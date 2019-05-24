FROM node:10.0

WORKDIR /usr/local/front

RUN apt-get update && apt-get upgrade -y

COPY ./script /usr/local/front/script
COPY package*.json /usr/local/front/
COPY ts*.json /usr/local/front/
COPY webpack*.js /usr/local/front/

RUN npm i

COPY ./server /usr/local/front/server
COPY ./utils /usr/local/front/utils
COPY ./config /usr/local/front/config
COPY ./src /usr/local/front/src

EXPOSE 3001

RUN npm run build