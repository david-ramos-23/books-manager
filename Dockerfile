FROM node:18-alpine as base
RUN npm install -g pnpm

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY ./client/package.json ./client/yarn.lock* ./client/package-lock.json* ./client/pnpm-lock.yaml* ./client/
# install backend dependencies  
RUN pnpm i --frozen-lockfile
# install frontend dependencies
RUN pnpm --filter client install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/client/node_modules ./client/node_modules
COPY . .
RUN pnpm build:prod

# # Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/ .

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]