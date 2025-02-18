# PEDIDO API Documentation

## 1. Create Order
- **HTTP Method:** POST
- **Content-Type:** application/json
- **Endpoint:** `/pedidos`
- **Request Body:**
  ```json
  {
    "clienteId": long,
    "restauranteId": long,
    "itens": [
      {
        "produtoId": long,
        "quantidade": int
      }
    ],
    "enderecoEntrega": "string",
    "formaPagamento": "string"
  }
  ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
  ```json
  {
    "id": long,
    "clienteId": long,
    "restauranteId": long,
    "status": "string",
    "dataHora": "string",
    "valorTotal": double
  }
  ```

## 2. Get Order by ID
- **HTTP Method:** GET
- **Endpoint:** `/pedidos/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  {
    "id": long,
    "clienteId": long,
    "restauranteId": long,
    "status": "string",
    "dataHora": "string",
    "valorTotal": double,
    "itens": [
      {
        "produtoId": long,
        "quantidade": int,
        "precoUnitario": double
      }
    ]
  }
  ```
  - **Status:** 404 Not Found (if order not found)

## 3. Update Order Status
- **HTTP Method:** PUT
- **Content-Type:** application/json
- **Endpoint:** `/pedidos/{id}/status`
- **Path Variable:** `id` (Long)
- **Request Body:**
  ```json
  {
    "status": "string"
  }
  ```
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  "Status do pedido atualizado com sucesso."
  ```

## 4. List Orders by Client
- **HTTP Method:** GET
- **Endpoint:** `/clientes/{id}/pedidos`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 200 OK
  - **Body:**
  ```json
  [
    {
      "id": long,
      "restauranteId": long,
      "status": "string",
      "dataHora": "string",
      "valorTotal": double
    }
  ]
  ```

## 5. Cancel Order
- **HTTP Method:** DELETE
- **Endpoint:** `/pedidos/{id}`
- **Path Variable:** `id` (Long)
- **Response:**
  - **Status:** 204 No Content
  - **Status:** 400 Bad Request (if order cannot be canceled)
