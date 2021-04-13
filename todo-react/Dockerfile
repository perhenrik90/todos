FROM node

WORKDIR /app
RUN npm install react
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --silent
COPY . .

CMD npm start
