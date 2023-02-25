# Dockerfile
 
FROM node:16-alpine

LABEL org.opencontainers.image.title "Xupopter Complete"
LABEL org.opencontainers.image.description "A self-hosted no-code webscrapper."
LABEL org.opencontainers.image.url="https://github.com/tetreum/xupopter_client"
LABEL org.opencontainers.image.source='https://github.com/tetreum/xupopter_client'
 
RUN npm install -g pnpm
 
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
 
COPY . .
RUN pnpm build
 
ENV PORT 8088
EXPOSE $PORT

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s \
  CMD wget --no-verbose --tries=1 --spider --no-check-certificate http://localhost:$PORT/api/healthcheck || exit 1

CMD ["node", "build"]