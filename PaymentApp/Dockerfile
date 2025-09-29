# Build stage
FROM node:20.19.0-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY PaymentApp/package.json PaymentApp/package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY PaymentApp/ ./

# Create production environments file with API URL pointing to backend service
RUN mkdir -p src/environments && \
    echo "export const environment = { production: true, apiBaseUrl: 'http://payment-api-service:8080/api/' };" > src/environments/environment.ts && \
    echo "export const environment = { production: true, apiBaseUrl: 'http://payment-api-service:8080/api/' };" > src/environments/environment.development.ts

# Build the application
RUN npm run build

# Deployment stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built files from the build stage
COPY --from=build /app/dist/PaymentApp/browser/ ./

# Copy custom nginx configuration
COPY PaymentApp/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
