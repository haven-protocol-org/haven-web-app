FROM node:lts-alpine3.10 as builder

ENV NET=0

RUN apk add git bash

COPY . /var/www

WORKDIR /var/www

RUN npm install
RUN npm run build:web

FROM nginx:alpine as runner


COPY --from=builder /var/www/build/ /usr/share/nginx/html/
