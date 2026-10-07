FROM ghcr.io/puppeteer/puppeteer:latest

# GitHub runs Docker actions as root and overrides the working directory,
# so everything uses absolute paths and the Chrome cache of the base image.
USER root
ENV PUPPETEER_CACHE_DIR=/home/pptruser/.cache/puppeteer

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY probe.js ./

ENTRYPOINT ["node", "/app/probe.js"]
