# Antes de executar o docker, siga os seguintes passos:

## 1. Certifique-se de ter o Maven instalado

- sudo apt install maven

## 2. Acesse o diretório do back

- cd/back

## 3. Utilize o wrapper

- mvn wrapper:wrapper

## 3. Instale as dependências:

- ./mvnw clean install

## 4. Crie o JAR:

- ./mvnw clean package

## 5. Agora é possível utilizar o docker

- docker build -t nome-da-imagem .
- docker run -p 8080:8080 nome-da-imagem

## 6. Teste a comunicação com a rota /health

- curl http://localhost:8080/health