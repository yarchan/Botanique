FROM node:latest

# Установка PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Копирование pg_hba.conf внутрь контейнера
COPY pg_hba.conf /etc/postgresql/15/main/pg_hba.conf

# Создание пользователя и базы данных
USER postgres
RUN /etc/init.d/postgresql start \
    && PGPASSWORD='0000' psql -U postgres -c "ALTER USER postgres WITH PASSWORD '0000';" \
    && createdb -U postgres botanique

USER root

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Скрипт для инициализации базы данных
COPY init.sql /docker-entrypoint-initdb.d/
RUN service postgresql start && psql -U postgres -d botanique -f /docker-entrypoint-initdb.d/init.sql


RUN npm install -g http-server

# Expose порта
EXPOSE 3000

# Запуск приложения
CMD service postgresql start && psql -U postgres -d botanique -f /docker-entrypoint-initdb.d/init.sql && node addate.js && node server.js && http-server -p 3000 /app

