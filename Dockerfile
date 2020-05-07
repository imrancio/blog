FROM gatsbyjs:blog AS build
ARG GATSBY_ACTIVE_ENV=production
ENV GATSBY_ACTIVE_ENV=$GATSBY_ACTIVE_ENV

# build production files
RUN gatsby build

FROM nginx
# serve production files
COPY --from=build /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
