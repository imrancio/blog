FROM node:12-alpine
RUN yarn global add gatsby-cli

WORKDIR /app
# install dependencies
COPY package.json package.json
RUN yarn install
