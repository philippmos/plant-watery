# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG BUILD_CONFIGURATION=production
RUN npm run build -- --configuration ${BUILD_CONFIGURATION}

FROM nginx:1.28.2-alpine AS final
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/plant-watery/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
