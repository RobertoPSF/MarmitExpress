# CLIENTE API Documentation

## Authentication
All endpoints except `/clientes/login` require a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

## 1. Create Client
- **HTTP Method:** POST
- **Content-Type:** application/json
- **Endpoint:** `/clientes`
- **Request Body:**
  ```json
  {
    "usuario": "string",
    "senha": "string",
    "endereco": "string",
    "nome": "string",
    "telefone": "string"
  }
  ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
  ```json
  {
    "id": long,
    "usuario": "string",
    "endereco": "string",
    "nome": "string",
    "telefone": "string",
    "listaDePedidos": null
  }
  ```

## 2. List Clients
- **HTTP Method:** GET
- **Endpoint:** `/clientes`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  [
    {
      "id": long,
      "usuario": "string",
      "endereco": "string",
      "nome": "string",
      "telefone": "string",
      "listaDePedidos": null
    }
    ...
  ]
  ```

## 3. Update Client
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/clientes/{id}`
- **Path Variable:** `id` (Long)
- **Request Body:**
  ```json
  {
    "usuario": "string",
    "senha": "string",
    "endereco": "string",
    "nome": "string",
    "telefone": "string"
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": long,
    "usuario": "string",
    "endereco": "string",
    "nome": "string",
    "telefone": "string",
    "listaDePedidos": null
  }
  ```
  - **Status:** 404 Not Found (if client not found)

## 4. Delete Client
- **HTTP Method:** DELETE
- **Endpoint:** `/clientes/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 204 No Content

## 5. Login Client
- **HTTP Method:** POST
- **Content-Type:** application/json
- **Endpoint:** `/clientes/login`
- **Request Body:**
  ```json
  {
    "usuario": "string",
    "senha": "string"
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "token": "string",
    "expiresIn": 3600
  }
  ```
  - **Status:** 401 Unauthorized (if login fails)
