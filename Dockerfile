FROM node:16-alpine AS build
ENV NODE_ENV=production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn && yarn gatsby telemetry --disable 2> /dev/null
COPY . .
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80
