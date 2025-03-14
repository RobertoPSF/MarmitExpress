# Documentação da API de Autenticação  

## Visão Geral  
A API utiliza JSON Web Tokens (JWT) para autenticação. Todos os endpoints, exceto `/auth/login` e `/auth/register`, requerem um token JWT válido no cabeçalho Authorization.  

## Fluxo de Autenticação  
1. O cliente se registra usando o endpoint `/auth/register`  
2. O cliente faz login usando o endpoint `/auth/login` para obter um token JWT  
3. O cliente inclui o token no cabeçalho Authorization para requisições subsequentes  
4. O servidor valida o token para cada requisição  

## Formato do Token  
`Authorization: Bearer <token>`  

## Endpoints  

### 1. Registrar Usuário  
- **Método HTTP:** POST  
- **Endpoint:** `/auth/register`  
- **Content-Type:** application/json  
- **Corpo da Requisição:**  
  ```json
  {
    "nome": "Nome do usuario",
    "email": "usuario@email.com",
    "senha": "password",
    "endereco": "Rua, número e bairro",
    "telefone": "(00) 00000-0000",
    "role": "CLIENTE|RESTAURANTE|ADMIN"
  }
  ```  
- **Resposta:**  
  - **Status:** 201 Created  
  - **Corpo:**  
  ```json
  "Usuário cadastrado com sucesso."
  ```  
  - **Status:** 400 Bad Request (se o e-mail já existir ou o papel for inválido)  

### 2. Login  
- **Método HTTP:** POST  
- **Endpoint:** `/auth/login`  
- **Content-Type:** application/json  
- **Corpo da Requisição:**  
  ```json
  {
    "email": "usuario@email.com",
    "senha": "password"
  }
  ```  
- **Resposta:**  
  - **Status:** 200 OK  
  - **Corpo:**  
  ```json
  {
    "token": "token"
  }
  ```  
  - **Status:** 401 Unauthorized (se a autenticação falhar)  

### 3. Alterar Senha  
- **Método HTTP:** POST  
- **Endpoint:** `/auth/new-password`  
- **Content-Type:** application/json  
- **Corpo da Requisição:**  
  ```json
  {
    "email": "usuario@email.com",
    "senha": "password"
  }
  ```  
- **Resposta:**  
  - **Status:** 200 OK  
  - **Corpo:**  
  ```json
  {
    "token": "token"
  }
  ```  
  - **Status:** 404 Not Found (se o e-mail não existir)  

## Respostas de Erro  
- **400 Bad Request**: Dados inválidos na requisição ou erros de validação  
- **401 Unauthorized**: Token inválido ou expirado  
- **403 Forbidden**: Token válido, mas sem permissões suficientes  

## Melhores Práticas de Segurança  
1. Sempre utilize HTTPS para comunicação com a API  
2. Armazene os tokens de forma segura (ex.: em memória ou armazenamento seguro)  
3. Implemente um mecanismo de renovação de token  
4. Utilize senhas fortes e implemente políticas de senha  
5. Faça a rotação regular das chaves de assinatura

