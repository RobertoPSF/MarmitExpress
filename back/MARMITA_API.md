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
    "preco": "double",
    "ingredientes": ["string"]
  }
  ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
  ```json
  {
    "id": long,
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "ingredientes": ["string"]
  }
  ```

## 2. Get Marmita by ID
- **HTTP Method:** GET
- **Endpoint:** `/marmitas/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": long,
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "ingredientes": ["string"]
  }
  ```
  - **Status:** 404 Not Found (if marmita not found)

## 3. Update Marmita
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/marmitas/{id}`
- **Path Variable:** `id` (Long)
- **Request Body:**
  ```json
  {
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "ingredientes": ["string"]
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": long,
    "nome": "string",
    "descricao": "string",
    "preco": double,
    "ingredientes": ["string"]
  }
  ```
  - **Status:** 404 Not Found (if marmita not found)
