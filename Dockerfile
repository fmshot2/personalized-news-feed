# Node.js image as a parent image
FROM node:18.17-alpine

# Working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# I will use this for production
# RUN npm run build

# For development, no need to build
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]

# I will use this for production
# CMD ["npm", "run", "preview"]
