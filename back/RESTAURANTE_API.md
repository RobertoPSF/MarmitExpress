# RESTAURANTE API Documentation

## 1. Create Restaurant
- **HTTP Method:** POST
- **Endpoint:** `/restaurantes`
- **Request Body:**
  ```json
  {
    "usuario": "string",
    "senha": "string",
    "nome": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": long,
    "usuario": "string",
    "senha": "string",
    "nome": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
    "aceitandoPedidos": true,
    "avaliacoes": []
  }
  ```

## 2. List Restaurants
- **HTTP Method:** GET
- **Endpoint:** `/restaurantes`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  [
    {
        "id": long,
        "usuario": "string",
        "senha": "string",
        "nome": "string",
        "endereco": "string",
        "telefone": "string",
        "descricao": "string",
        "aceitandoPedidos": true,
        "avaliacoes": []
    },
    ...
  ]
  ```

## 3. Get Restaurant by ID
- **HTTP Method:** GET
- **Endpoint:** `/restaurantes/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": long,
    "usuario": "string",
    "senha": "string",
    "nome": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
    "aceitandoPedidos": true,
    "avaliacoes": []
  }
  ```
  - **Status:** 404 Not Found (if restaurant not found)

## 4. Update Restaurant
- **HTTP Method:** PUT
- **Endpoint:** `/restaurantes/{id}`
- **Path Variable:** `id` (Long)
- **Request Body:**
  ```json
  {
    "usuario": "string",
    "senha": "string",
    "nome": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": long,
    "usuario": "string",
    "senha": "string",
    "nome": "string",
    "endereco": "string",
    "telefone": "string",
    "descricao": "string",
    "aceitandoPedidos": true,
    "avaliacoes": []
  }
  ```
  - **Status:** 404 Not Found (if restaurant not found)

## 5. Add Evaluation
- **HTTP Method:** PUT
- **Endpoint:** `/restaurantes/{id}/avaliacao`
- **Path Variable:** `id` (Long)
- **Request Body:**
  ```json
  {
    "avaliacao": double
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  "Avaliação registrada com sucesso."
  ```

## 6. Delete Restaurant
- **HTTP Method:** DELETE
- **Endpoint:** `/restaurantes/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 204 No Content

## 7. Login Restaurant
- **HTTP Method:** POST
- **Endpoint:** `/restaurantes/login`
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
    "id": 1
  }
  ```
  - **Status:** 401 Unauthorized (if login fails)
