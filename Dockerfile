FROM node:18

WORKDIR /nestjs-ddd

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start:dev"]