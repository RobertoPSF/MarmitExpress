FROM node:18-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar arquivos necessários para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código-fonte
COPY . .

# Expor a porta usada pelo Vite
EXPOSE 3000

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "--port", "3000"]
