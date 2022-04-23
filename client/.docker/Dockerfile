FROM node:14-buster as builder

ARG REACT_APP_NET_TYPE_ID
ARG REACT_APP_HAVEN_DIRECT_HOST

WORKDIR /var/www

COPY . .

RUN git config --global url."https://".insteadOf git://

RUN npm install
RUN npm install haven-wallet-core@latest --save
RUN npm run copy-haven-core
RUN npm audit fix --production
RUN npm run build:web:ci

FROM nginx:stable-alpine

RUN apk add --upgrade apk-tools \
    && apk --no-cache upgrade --available \
    && apk add --no-cache nginx
#haproxy supervisor

COPY --from=builder /var/www/build /usr/share/nginx/html
#COPY .docker/haproxy/haproxy.cfg /etc/haproxy/
COPY .docker/nginx/default.conf /etc/nginx/http.d/
#COPY .docker/supervisord/haven.ini /etc/supervisor.d/

#CMD ["/usr/bin/supervisord"]

#CMD ["nginx","-g","'daemon off;'"]