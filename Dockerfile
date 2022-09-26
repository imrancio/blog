FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
# must run 'yarn build' on host machine first
ADD public /usr/share/nginx/html

EXPOSE 80
