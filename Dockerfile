From node:10-alpine as build-step
RUN mkdir /app
WORKDIR /usr/src/app
copy package*.json ./
RUN npm install --only=production
# Bundle app source
COPY . . 

EXPOSE 8000
CMD ["npm", "start"]