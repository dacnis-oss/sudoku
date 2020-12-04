FROM node:12
WORKDIR /usr/src/app

COPY ./app/src/package*.json ./

COPY ./app/src .

EXPOSE 3000

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" |  tee /etc/apt/sources.list.d/yarn.list
RUN yarn install
CMD ["yarn", "start"]
