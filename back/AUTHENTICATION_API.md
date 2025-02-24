# AUTHENTICATION API Documentation

## Overview
The API uses JSON Web Tokens (JWT) for authentication. All endpoints except `/auth/login` and `/auth/register` require a valid JWT token in the Authorization header.

## Authentication Flow
1. Client registers using `/auth/register` endpoint
2. Client logs in using `/auth/login` endpoint to obtain JWT token
3. Client includes token in Authorization header for subsequent requests
4. Server validates token for each request

## Token Format
`Authorization: Bearer <token>`

## Endpoints

### 1. Register User
- **HTTP Method:** POST
- **Endpoint:** `/auth/register`
- **Content-Type:** application/json
- **Request Body:**
  ```json
  {
    "nome": "string",
    "email": "string",
    "senha": "string",
    "endereco": "string",
    "telefone": "string",
    "role": "CLIENTE|RESTAURANTE"
  }
  ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
  ```json
  "Usuário cadastrado com sucesso."
  ```
  - **Status:** 400 Bad Request (if email already exists or invalid role)

### 2. Login
- **HTTP Method:** POST
- **Endpoint:** `/auth/login`
- **Content-Type:** application/json
- **Request Body:**
  ```json
  {
    "email": "string",
    "senha": "string"
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "token": "string"
  }
  ```
  - **Status:** 401 Unauthorized (if authentication fails)

## Error Responses
- **400 Bad Request**: Invalid request data or validation errors
- **401 Unauthorized**: Invalid or expired token
- **403 Forbidden**: Valid token but insufficient permissions

## Security Best Practices
1. Always use HTTPS for API communication
2. Store tokens securely (e.g., in memory or secure storage)
3. Implement token refresh mechanism
4. Use strong passwords and implement password policies
5. Regularly rotate signing keys
