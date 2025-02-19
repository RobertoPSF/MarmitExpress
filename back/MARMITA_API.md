# MARMITA API Documentation

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
  ```json
  {
    "id": "long",
    "nome": "string",
    "descricao": "string",
    "preco": "double",
    "ingredientes": ["string"]
  }
  ```

## 2. Get Marmita by ID
- **HTTP Method:** GET
- **Endpoint:** `/marmitas/{id}`
- **Response:**
  ```json
  {
    "id": "long",
    "nome": "string",
    "descricao": "string",
    "preco": "double",
    "ingredientes": ["string"]
  }
  ```

## 3. Update Marmita
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/marmitas/{id}`
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
  ```json
  {
    "id": "long",
    "nome": "string",
    "descricao": "string",
    "preco": "double",
    "ingredientes": ["string"]
  }
  ```
