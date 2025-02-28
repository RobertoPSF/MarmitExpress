# MARMITA API Documentation

## Authentication
All endpoints require a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

## 1. Create Marmita
- **HTTP Method:** POST
- **Content-Type:** application/json
- **Endpoint:** `/marmitas`
- **Request Body:**
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "quantidade": int,
    "ingredientes": ["string"],
    "restauranteId": UUID
  }
  ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
  ```json
  {
    "id": UUID,
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "quantidade": int,
    "ingredientes": ["string"],
    "restauranteId": UUID
  }
  ```

## 2. Get Marmita by ID
- **HTTP Method:** GET
- **Endpoint:** `/marmitas/{id}`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": UUID,
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "quantidade": int,
    "ingredientes": ["string"],
    "restauranteId": UUID
  }
  ```
  - **Status:** 404 Not Found (if marmita not found)

## 3. Update Marmita
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/marmitas/{id}`
- **Path Variable:** `id` (UUID)
- **Request Body:**
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "quantidade": int,
    "ingredientes": ["string"],
    "restauranteId": UUID
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": UUID,
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "quantidade": int,
    "ingredientes": ["string"],
    "restauranteId": UUID
  }
  ```
  - **Status:** 404 Not Found (if marmita not found)