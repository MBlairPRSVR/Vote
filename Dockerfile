# Use an official Node image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Build the Vite app
RUN npm run build

# Install a simple server to serve the built app
RUN npm install -g serve

# Expose port Vite will serve on
EXPOSE 5173

# Command to serve the built app
CMD ["serve", "-s", "dist", "-l", "5173"]
