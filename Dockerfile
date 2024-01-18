# Etap 1: Buduj aplikację Angular
FROM node:latest as node

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

# Etap 2: Uruchom aplikację przy użyciu serwera Nginx
FROM nginx:alpine

# Kopiuj skompilowane pliki z etapu 1 do folderu serwera Nginx
COPY --from=node /app/dist/grafik /usr/share/nginx/html

# Kopiuj plik konfiguracyjny Nginx do odpowiedniego folderu
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf


# COPY nginx-custom.conf /etc/nginx/nginx.conf

EXPOSE 80

# Rozpocznij serwer Nginx
CMD ["nginx", "-g", "daemon off;"]
