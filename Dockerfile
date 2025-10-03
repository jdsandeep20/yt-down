# Use Node.js 22 Alpine for smaller image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code (respecting .dockerignore)
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Expose port (Railway will override this)
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Start the application
CMD ["npm", "start"]