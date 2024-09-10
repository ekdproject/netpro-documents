FROM node:12.22.1-alpine3.10

# We have to install nodemon globally before moving into the working directory
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

COPY . .
RUN npm install
CMD [ "node","index.js" ]

EXPOSE 1234