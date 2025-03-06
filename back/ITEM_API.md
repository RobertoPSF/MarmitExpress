# ITEM API Documentation

## Overview
The ITEM API allows for the management of items within the system. It provides endpoints to create, retrieve, update, and delete items, as well as to list items associated with a specific restaurant.

## Endpoints

### Create Item
- **POST** `/itens`
- **Description**: Creates a new item.
- **Request Body**:
  ```json
  {
    "nome": "string",
    "preco": "number",
    "quantidade": "number"
  }
  ```
- **Response**:
  - **200 OK**: Returns the created item.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "restauranteId": "UUID"
  }
  ```
  - **403 Forbidden**: If the restaurant is not found.

### List Items
- **GET** `/itens`
- **Description**: Retrieves a list of all items.
- **Response**:
  - **200 OK**: Returns a list of items.
  ```json
  [
    {
      "id": "UUID",
      "nome": "string",
      "preco": "number",
      "quantidade": "number",
      "restauranteId": "UUID"
    }
  ]
  ```

### Get Item by ID
- **GET** `/itens/{id}`
- **Description**: Retrieves a specific item by its ID.
- **Response**:
  - **200 OK**: Returns the item.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "restauranteId": "UUID"
  }
  ```
  - **404 Not Found**: If the item is not found.

### Update Item
- **PUT** `/itens/{id}`
- **Description**: Updates an existing item.
- **Request Body**:
  ```json
  {
    "nome": "string",
    "preco": "number",
    "quantidade": "number"
  }
  ```
- **Response**:
  - **200 OK**: Returns the updated item.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "restauranteId": "UUID"
  }
  ```
  - **403 Forbidden**: If the restaurant is not found or does not own the item.

### Delete Item
- **DELETE** `/itens/{id}`
- **Description**: Deletes a specific item by its ID.
- **Response**:
  - **204 No Content**: If the item is successfully deleted.
  - **403 Forbidden**: If the restaurant is not found or does not own the item.

### Get Items by Restaurant
- **GET** `/itens/restaurante`
- **Description**: Retrieves a list of items associated with the authenticated restaurant.
- **Response**:
  - **200 OK**: Returns a list of items.
  ```json
  [
    {
      "id": "UUID",
      "nome": "string",
      "preco": "number",
      "quantidade": "number",
      "restauranteId": "UUID"
    }
  ]
  ```
  - **403 Forbidden**: If the restaurant is not found.
