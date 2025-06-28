# Documentação da API de Autenticação - MarmitExpress

## Visão Geral

A API utiliza JSON Web Tokens (JWT) para autenticação. Todos os endpoints, exceto `/auth/login` e `/auth/register`, requerem um token JWT válido no cabeçalho `Authorization`.

## Fluxo de Autenticação - Como Funciona

1. O cliente se registra usando o endpoint `/auth/register`.
2. O cliente faz login usando o endpoint `/auth/login` para obter um token JWT.
3. O cliente inclui o token no cabeçalho `Authorization` para requisições subsequentes.
4. O servidor valida o token para cada requisição.

## Formato do Token

```text
Authorization: Bearer <token>
```

## Endpoints

### 1. Registrar Usuário

- **Método HTTP:** `POST`
- **Endpoint:** `/auth/register`
- **Content-Type:** `application/json`

#### 📌 Cadastro de CLIENTE

```json
{
  "nome": "João da Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "endereco": "Rua A, 123, Bairro Centro",
  "telefone": "(11) 99999-9999",
  "role": "CLIENTE"
}
```

#### 📌 Cadastro de RESTAURANTE

**⚠️ O campo `nomeProprietario` é obrigatório para usuários do tipo RESTAURANTE e deve conter o nome do titular da conta vinculada à chave PIX (se for Pessoa Física).**

```json
{
  "nome": "Restaurante Sabor Caseiro",
  "email": "contato@saborcaseiro.com",
  "senha": "senha123",
  "endereco": "Avenida Central, 456, Bairro Gourmet",
  "telefone": "(11) 88888-8888",
  "role": "RESTAURANTE",
  "nomeProprietario": "Carlos Ferreira",
  "descricao": "O melhor sabor caseiro da cidade!",
  "chavePix": "carlosferreira@banco.com"
}
```

- **Resposta:**
  - **Status:** `201 Created`
  - **Corpo:**
  ```json
  "Usuário cadastrado com sucesso."
  ```
  - **Status:** `400 Bad Request` (se o e-mail já existir ou os dados forem inválidos)

---

### 2. Login

- **Método HTTP:** `POST`
- **Endpoint:** `/auth/login`
- **Content-Type:** `application/json`
- **Corpo da Requisição:**

```json
{
  "email": "usuario@email.com",
  "senha": "password"
}
```

- **Resposta:**
  - **Status:** `200 OK`
  - **Corpo:**
  ```json
  {
    "token": "token"
  }
  ```
  - **Status:** `401 Unauthorized` (se a autenticação falhar)

<<<<<<< HEAD
### 3. Atualizar Senha do Usuário

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
- **Status:** 200 OK (Senha atualizada com sucesso)  

  - **Corpo:**  
=======
---

### 3. Atualizar Senha do Usuário

- **Método HTTP:** `POST`
- **Endpoint:** `/auth/new-password`
- **Content-Type:** `application/json`
- **Corpo da Requisição:**

```json
{
  "email": "usuario@email.com",
  "senha": "novaSenha123"
}
```

- **Resposta:**
  - **Status:** `200 OK` (Senha atualizada com sucesso)
  - **Corpo:**
>>>>>>> front
  ```json
  {
    "token": "token"
  }
<<<<<<< HEAD
  ```  
- **Status:** 404 Not Found (se o e-mail não estiver cadastrado)  

=======
  ```
  - **Status:** `404 Not Found` (se o e-mail não estiver cadastrado)
>>>>>>> front

---

<<<<<<< HEAD
## Melhores Práticas de Segurança para a API

1. Sempre utilize HTTPS para comunicação com a API  
2. Armazene os tokens de forma segura (ex.: em memória ou armazenamento seguro)  
3. Implemente um mecanismo de renovação de token  
4. Utilize senhas fortes e implemente políticas de senha  
5. Faça a rotação regular das chaves de assinatura
=======
## Respostas de Erro

- **`400 Bad Request`**: Dados inválidos na requisição ou erros de validação
- **`401 Unauthorized`**: Token inválido ou expirado
- **`403 Forbidden`**: Token válido, mas sem permissões suficientes

---

## Melhores Práticas de Segurança para a API

1. Sempre utilize **HTTPS** para comunicação com a API.
2. Armazene os tokens de forma segura (ex.: em memória ou armazenamento seguro).
3. Implemente um mecanismo de **renovação de token**.
4. Utilize **senhas fortes** e implemente **políticas de senha**.
5. Faça a **rotação regular das chaves de assinatura** para evitar vulnerabilidades.
>>>>>>> front
