# ITEM API Documentation

## Authentication
All endpoints require a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

## 1. Create Item
- **HTTP Method:** POST
- **Content-Type:** application/json
- **Endpoint:** `/itens`
- **Request Body:**
```json
{
  "nome": "string",
  "preco": "double",
  "quantidade": "int",
  "restauranteId": "long"
}
```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
```json
{
  "id": long,
  "nome": "string",
  "preco": double,
  "quantidade": int,
  "restauranteId": long
}
```

## 2. List Items
- **HTTP Method:** GET
- **Endpoint:** `/itens`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
```json
[
  {
    "id": long,
    "nome": "string",
    "preco": double,
    "quantidade": int,
    "restauranteId": long
  },
  ...
]
```

## 3. Get Item by ID
- **HTTP Method:** GET
- **Endpoint:** `/itens/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
```json
{
  "id": long,
  "nome": "string",
  "preco": double,
  "quantidade": int,
  "restauranteId": long
}
```
  - **Status:** 404 Not Found (if item not found)

## 4. Update Item
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/itens/{id}`
- **Path Variable:** `id` (Long)
- **Request Body:**
```json
{
  "nome": "string",
  "preco": double,
  "quantidade": int
}
```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
```json
{
  "id": long,
  "nome": "string",
  "preco": double,
  "quantidade": int,
  "restauranteId": long
}
```
  - **Status:** 404 Not Found (if item not found)

## 5. Delete Item
- **HTTP Method:** DELETE
- **Endpoint:** `/itens/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 204 No Content
