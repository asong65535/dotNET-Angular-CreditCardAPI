# Build stage
FROM node:20.19.0-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY PaymentApp/package.json PaymentApp/package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY PaymentApp/ ./

# For local Docker Compose environment:
# Set the API URL to connect to the backend on localhost with the exposed port
RUN mkdir -p src/environments && \
    echo "export const environment = { production: true, apiBaseUrl: 'http://localhost:5173/api/' };" > src/environments/environment.ts && \
    echo "export const environment = { production: true, apiBaseUrl: 'http://localhost:5173/api/' };" > src/environments/environment.development.ts

# Add a debug line to ensure we see the environment being built with the correct URL
RUN echo "Building with API URL: http://localhost:5173/api/"

# Build the application
RUN npm run build

# Check what's in the environment files after build
RUN cat ./dist/browser/main*.js | grep -A 2 -B 2 apiBaseUrl || echo "apiBaseUrl not found in build output"

# Deployment stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built files from the build stage
# Angular CLI 20.x output directory is 'dist/browser'
COPY --from=build /app/dist/PaymentApp/browser/ ./

# Add a default.conf file for Nginx
RUN echo 'server { \
  listen 80; \
  server_name localhost; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
