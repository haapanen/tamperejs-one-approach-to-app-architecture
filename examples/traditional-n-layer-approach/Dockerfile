FROM node:latest
WORKDIR /app
RUN chown node:node /app
USER node
COPY package.json package-lock.json ./
RUN npm ci
CMD ["npm", "run", "dev"]