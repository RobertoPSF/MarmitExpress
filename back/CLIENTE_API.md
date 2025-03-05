# CLIENTE API Documentation

## Authentication
All endpoints require a valid JWT token in the Authorization header:
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
      "id": "UUID",
      "nome": "string",
      "email": "string",
      "endereco": "string",
      "telefone": "string"
    }
  ]
  ```

## 2. Get My Profile
- **HTTP Method:** GET
- **Endpoint:** `/clientes/me`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "email": "string",
    "endereco": "string",
    "telefone": "string"
  }
  ```
  - **Status:** 404 Not Found (if client not found)

## 3. Update My Profile
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/clientes/me`
- **Request Body:**
  ```json
  {
    "nome": "string",
    "endereco": "string",
    "telefone": "string"
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
    "telefone": "string"
  }
  ```
  - **Status:** 404 Not Found (if client not found)

## 4. Delete Client
- **HTTP Method:** DELETE
- **Endpoint:** `/clientes/{id}`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 204 No Content

## 5. Create Payment
- **HTTP Method:** POST
- **Endpoint:** `/clientes/pagamentos`
- **Request Parameters:**
  - `valor`: Double
  - `descricao`: String
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": "UUID",
    "valor": "double",
    "descricao": "string",
    "status": "string"
  }
  ```

## 6. Generate QR Code for Payment
- **HTTP Method:** GET
- **Endpoint:** `/clientes/pagamentos/{id}/qr-code`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 200 OK
  - **Content-Type:** `image/png`
  - **Body:** Binary QR code image
  - **Status:** 404 Not Found (if payment not found)

## 7. Check Payment Status
- **HTTP Method:** GET
- **Endpoint:** `/clientes/pagamentos/{id}/status`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  "string"  // Payment status
  ```
  - **Status:** 404 Not Found (if payment not found)

