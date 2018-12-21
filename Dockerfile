# specify the node base image with your desired version node:<version>
FROM node:10 as builder
# replace this with your application's default port

WORKDIR /payword-frontend

COPY . .

RUN yarn install

RUN yarn build 

# CMD yarn start

# production environment

FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /payword-frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
