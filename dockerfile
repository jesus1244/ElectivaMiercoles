# Usa una imagen de Node.js como base
FROM node:14

# Crea y establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila la aplicación TypeScript
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
