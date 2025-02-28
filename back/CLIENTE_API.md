# CLIENTE API Documentation

## Authentication
All endpoints except `/clientes/login` require a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

## 1. List Clients
- **Only Admin**
- **HTTP Method:** GET
- **Endpoint:** `/clientes`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  [
    {
      "id": UUID,
      "usuario": "string",
      "endereco": "string",
      "nome": "string",
      "telefone": "string",
      "listaDePedidos": null
    }
    ...
  ]
  ```

## 2. Update Client
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/clientes/{id}`
- **Path Variable:** `id` (UUID)
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
    "id": UUID,
    "usuario": "string",
    "endereco": "string",
    "nome": "string",
    "telefone": "string",
    "listaDePedidos": null
  }
  ```
  - **Status:** 404 Not Found (if client not found)

## 3. Delete Client
- **HTTP Method:** DELETE
- **Endpoint:** `/clientes/{id}`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 204 No Content
