FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
EXPOSE 9876

ENV NODE_ENV=production

CMD ["node", "server.js"]
