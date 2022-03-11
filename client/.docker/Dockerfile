FROM node:14-buster as builder

ARG REACT_APP_NET_TYPE_ID

WORKDIR /var/www

COPY . .

RUN echo $REACT_APP_NET_TYPE_ID
RUN npm install
RUN npm install haven-wallet-core@latest --save
RUN npm run copy-haven-core
RUN npm audit fix --production
RUN npm run build:web:ci

FROM alpine:3.15

RUN apk add --no-cache nginx haproxy supervisor

COPY --from=builder /var/www/build /usr/share/nginx/html
COPY .docker/haproxy/haproxy.cfg /etc/haproxy/
COPY .docker/nginx/default.conf /etc/nginx/http.d/
COPY .docker/supervisord/haven.ini /etc/supervisor.d/

CMD ["/usr/bin/supervisord"]

