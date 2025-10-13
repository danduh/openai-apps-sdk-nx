# Multi-stage build for payo-mcp Node.js service
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json tsconfig.base.json tsconfig.json ./

# Copy the entire workspace (needed for Nx build)
COPY apps ./apps
COPY eslint.config.mjs jest.config.ts jest.preset.js vitest.workspace.ts ./

# Install dependencies
RUN npm ci

# Build the payo-mcp application
RUN npx nx build payo-mcp --configuration=production

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/apps/payo-mcp/dist ./dist

# Copy package files for production dependencies
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose the port the app runs on (adjust if needed)
EXPOSE 8000

# Run the application
CMD ["node", "dist/server.js"]
