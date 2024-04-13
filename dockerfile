FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and possibly package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# build the client assets
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

CMD [ "npm", "run", "start" ]
