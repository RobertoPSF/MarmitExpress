# RESTAURANTE API Documentation

## Authentication
All endpoints except `/restaurantes/login` require a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`


## 1. List Restaurants
- **HTTP Method:** GET
- **Endpoint:** `/restaurantes`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  [
    {
      "id": "UUID",
      "nome": "string",
      "email": "string",
      "endereco": "string",
      "telefone": "string",
      "descricao": "string",
      "aceitandoPedidos": true,
      "chavePix": "string"
    },
    ...
  ]
  ```

## 2. Get Restaurant by ID
- **HTTP Method:** GET
- **Endpoint:** `/restaurantes/{id}`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "email": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
    "aceitandoPedidos": true,
    "chavePix": "string"
  }
  ```
  - **Status:** 404 Not Found (if restaurant not found)

## 3. Update Restaurant
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/restaurantes/{id}`
- **Path Variable:** `id` (UUID)
- **Request Body:**
  ```json
  {
    "nome": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
    "aceitandoPedidos": true,
    "chavePix": "string"
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "email": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
    "aceitandoPedidos": true,
    "chavePix": "string"
  }
  ```
  - **Status:** 404 Not Found (if restaurant not found)

## 6. Delete Restaurant
- **HTTP Method:** DELETE
- **Endpoint:** `/restaurantes/{id}`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 204 No Content