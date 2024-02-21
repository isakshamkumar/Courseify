# Build the base image
FROM node:18-alpine as base
WORKDIR /app
COPY src ./src
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./
RUN npm install

# Build the app
FROM base as build
WORKDIR /app
RUN npm run build

# Production
FROM node:18-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./

# Set the environment variable
ENV UPSTASH_REDIS_REST_URL="redis://default:a44626e60808406ca07e7de73bfbb211@outgoing-octopus-36444.upstash.io:36444"

# Start the application
CMD ["node", "index.js"]
