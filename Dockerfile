FROM node:14.17.0

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD npm start