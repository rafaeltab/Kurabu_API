FROM node:latest

COPY . src

RUN cd src/projects/@kurabu/gateway && npm run build

RUN cp -r src/build/ app/

RUN rm -rf src

WORKDIR app/ts/projects/@kurabu/gateway

ENTRYPOINT npm run starthere