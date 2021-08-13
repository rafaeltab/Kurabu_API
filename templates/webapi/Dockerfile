FROM node:latest

COPY . src

RUN cd src/projects/@kurabu/project-template && npm run build

RUN cp -r src/build/ app/

RUN rm -rf src

WORKDIR app/ts/projects/@kurabu/project-template

ENTRYPOINT npm run starthere