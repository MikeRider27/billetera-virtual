FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ⚠️ Build con variables de entorno inyectadas
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build del frontend con las variables disponibles
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
