FROM node:10.15.3

RUN mkdir -p /app

ADD package.json yarn.lock /app/

WORKDIR /app

RUN npm install yarn -g
RUN yarn install
ADD . /app
WORKDIR /app/

EXPOSE 3000

CMD ["yarn", "start"]
