# Imagen base con Python y Node.js
FROM python:3.10

# Instalar Node.js y npm
RUN apt-get update && apt-get install -y nodejs npm

# Crear directorio de trabajo
WORKDIR /app

# Copiar y configurar el backend
COPY backend/ecommerce /app/backend
WORKDIR /app/backend
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copiar y configurar el frontend
WORKDIR /app/frontend
COPY frontend/E-commerce /app/frontend
RUN npm install --force
RUN npm run build  # 🔥 Compilar el frontend

# Mover el build de React al backend
RUN mkdir -p /app/backend/static/frontend
RUN cp -r /app/frontend/dist/* /app/backend/static/frontend/

# Exponer puertos (Django en 8000)
EXPOSE 8000

# Comando final: Migraciones y Gunicorn (sin StatReloader)
CMD ["sh", "-c", "cd /app/backend && python manage.py migrate && gunicorn --bind 0.0.0.0:8000 ecommerce.wsgi:application"]
