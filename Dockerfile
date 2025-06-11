FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Configurar variáveis de ambiente explicitamente
ENV NODE_ENV=development
ENV PORT=8080
ENV SECRET_KEY=Ht5Yk9LzQ7wX3pRm2vB8nA6cD1eF0jS4
ENV URL_CLIENT=http://localhost:8080
ENV SESSION_EXPIRY=86400000
ENV DB_PATH=database.sqlite

# Expor a porta da aplicação explicitamente
EXPOSE 8080

CMD ["npm", "start"]