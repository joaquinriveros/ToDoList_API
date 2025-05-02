# Usa una imagen oficial de Node.js
FROM node:18

# Crea y se mueve al directorio de la app
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el resto del código
COPY . .

# Expone el puerto en que corre la app
EXPOSE 3001

# Comando para correr la app
CMD ["node", "app.js"]
