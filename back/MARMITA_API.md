# MARMITA API Documentation

## Overview
The MARMITA API allows for the management of marmitas within the system. It provides endpoints to create, retrieve, update, and delete marmitas, as well as to list marmitas associated with a specific restaurant.

## Endpoints

### Create Marmita
- **POST** `/marmitas`
- **Description**: Creates a new marmita.
- **Request Body**:
  ```json
  {
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "ingredientes": "string"
  }
  ```
- **Response**:
  - **200 OK**: Returns the created marmita.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "ingredientes": "string",
    "restauranteId": "UUID"
  }
  ```
  - **403 Forbidden**: If the restaurant is not found.

### List Marmitas
- **GET** `/marmitas`
- **Description**: Retrieves a list of all marmitas.
- **Response**:
  - **200 OK**: Returns a list of marmitas.
  ```json
  [
    {
      "id": "UUID",
      "nome": "string",
      "preco": "number",
      "quantidade": "number",
      "ingredientes": "string",
      "restauranteId": "UUID"
    }
  ]
  ```

### Get Marmita by ID
- **GET** `/marmitas/{id}`
- **Description**: Retrieves a specific marmita by its ID.
- **Response**:
  - **200 OK**: Returns the marmita.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "ingredientes": "string",
    "restauranteId": "UUID"
  }
  ```
  - **404 Not Found**: If the marmita is not found.

### Update Marmita
- **PUT** `/marmitas/{id}`
- **Description**: Updates an existing marmita.
- **Request Body**:
  ```json
  {
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "ingredientes": "string"
  }
  ```
- **Response**:
  - **200 OK**: Returns the updated marmita.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "preco": "number",
    "quantidade": "number",
    "ingredientes": "string",
    "restauranteId": "UUID"
  }
  ```
  - **403 Forbidden**: If the restaurant is not found or does not own the marmita.

### Delete Marmita
- **DELETE** `/marmitas/{id}`
- **Description**: Deletes a specific marmita by its ID.
- **Response**:
  - **204 No Content**: If the marmita is successfully deleted.
  - **403 Forbidden**: If the restaurant is not found or does not own the marmita.

### List Marmitas by Restaurant
- **GET** `/marmitas/listar/{restauranteId}`
- **Description**: Retrieves a list of marmitas associated with a specific restaurant.
- **Response**:
  - **200 OK**: Returns a list of marmitas.
  ```json
  [
    {
      "id": "UUID",
      "nome": "string",
      "preco": "number",
      "quantidade": "number",
      "ingredientes": "string",
      "restauranteId": "UUID"
    }
  ]
  ```
