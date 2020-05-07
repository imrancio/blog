ARG GATSBY_ACTIVE_ENV=production
FROM node:12-alpine AS build

ARG GATSBY_ACTIVE_ENV
ENV GATSBY_ACTIVE_ENV=$GATSBY_ACTIVE_ENV
RUN yarn global add gatsby-cli

WORKDIR /app
# install dependencies
COPY package.json package.json
RUN yarn install
# bundle source
COPY . .
# build production files
RUN gatsby build

FROM nginx
# serve production files
COPY --from=build /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

