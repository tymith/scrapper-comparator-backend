FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -g nodemon
RUN npm install
EXPOSE 8000
CMD ["npm","start"]
