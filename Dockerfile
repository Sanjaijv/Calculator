FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# ------------ PRODUCTION IMAGE -------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy standalone output
COPY --from=builder /app/.next/standalone ./

# Copy static assets
COPY --from=builder /app/.next/static ./.next/static

# Copy public folder
COPY --from=builder /app/public ./public

EXPOSE 3000

# Fixed: Use correct path in container
CMD ["node", "server.js"]