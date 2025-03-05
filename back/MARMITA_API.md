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
  "preco": "double",
  "quantidade": "int",
  "ingredientes": [
    { "id": "UUID", "nome": "string" }
  ],
  "restauranteId": "UUID"
}
```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
```json
{
  "id": "UUID",
  "nome": "string",
  "preco": double,
  "quantidade": int,
  "ingredientes": [
    { "id": "UUID", "nome": "string" }
  ],
  "restauranteId": "UUID"
}
```

## 2. List Marmitas
- **HTTP Method:** GET
- **Endpoint:** `/marmitas`
- **Response:**
  - **Status:** 200 OK
  - **Body:**
```json
[
  {
    "id": "UUID",
    "nome": "string",
    "preco": double,
    "quantidade": int,
    "ingredientes": [
      { "id": "UUID", "nome": "string" }
    ],
    "restauranteId": "UUID"
  },
  ...
]
```

## 3. Get Marmita by ID
- **HTTP Method:** GET
- **Endpoint:** `/marmitas/{id}`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
```json
{
  "id": "UUID",
  "nome": "string",
  "preco": double,
  "quantidade": int,
  "ingredientes": [
    { "id": "UUID", "nome": "string" }
  ],
  "restauranteId": "UUID"
}
```
  - **Status:** 404 Not Found (if marmita not found)

## 4. Update Marmita
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/marmitas/{id}`
- **Path Variable:** `id` (UUID)
- **Request Body:**
```json
{
  "nome": "string",
  "preco": double,
  "quantidade": int,
  "ingredientes": [
    { "id": "UUID", "nome": "string" }
  ]
}
```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
```json
{
  "id": "UUID",
  "nome": "string",
  "preco": double,
  "quantidade": int,
  "ingredientes": [
    { "id": "UUID", "nome": "string" }
  ],
  "restauranteId": "UUID"
}
```
  - **Status:** 404 Not Found (if marmita not found)

## 5. Delete Marmita
- **HTTP Method:** DELETE
- **Endpoint:** `/marmitas/{id}`
- **Path Variable:** `id` (UUID)
- **Response:**
  - **Status:** 204 No Content
