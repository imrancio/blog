ARG GATSBY_ACTIVE_ENV=production
FROM node:12-alpine AS build

RUN yarn global add gatsby-cli
ARG GATSBY_ACTIVE_ENV
ENV GATSBY_ACTIVE_ENV=$GATSBY_ACTIVE_ENV

WORKDIR /app
ADD . ./
RUN yarn install
RUN gatsby build

FROM nginx
COPY --from=build /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

