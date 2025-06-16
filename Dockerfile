FROM node:18-alpine

WORKDIR /app

# Instalar ferramentas de rede para diagnóstico
RUN apk add --no-cache iputils curl

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta que a aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]