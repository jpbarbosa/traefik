# Build assets for production

FROM node:24-alpine AS node
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# PHP-FPM

FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-interaction --no-dev --optimize-autoloader

COPY --from=vite /var/www/public/build ./public/build

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
