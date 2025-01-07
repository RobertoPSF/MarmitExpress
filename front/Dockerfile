# Imagem base para Node.js (TypeScript/React/Angular/Vue)
FROM node:18-alpine AS builder

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm install

# Rodar o build para gerar a pasta dist
RUN npm run build

# Imagem base para servir o frontend
FROM nginx:alpine

# Copiar os arquivos da pasta dist para o NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta do NGINX
EXPOSE 80

# Comando para rodar o NGINX
CMD ["nginx", "-g", "daemon off;"]

