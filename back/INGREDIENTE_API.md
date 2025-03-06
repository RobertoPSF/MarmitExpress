# INGREDIENTE API Documentation

## Overview
The INGREDIENTE API allows for the management of ingredients within the system. It provides endpoints to create, retrieve, update, and delete ingredients, as well as to list ingredients associated with a specific restaurant.

## Endpoints

### Create Ingredient
- **POST** `/ingredientes/me`
- **Description**: Creates a new ingredient for the authenticated restaurant.
- **Request Body**:
  ```json
  {
    "nome": "string",
    "quantidade": "number"
  }
  ```
- **Response**:
  - **200 OK**: Returns the created ingredient.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "quantidade": "number",
    "restauranteId": "UUID"
  }
  ```
  - **403 Forbidden**: If the restaurant is not found.

### Get My Ingredients
- **GET** `/ingredientes/me`
- **Description**: Retrieves a list of ingredients for the authenticated restaurant.
- **Response**:
  - **200 OK**: Returns a list of ingredients.
  ```json
  [
    {
      "id": "UUID",
      "nome": "string",
      "quantidade": "number",
      "restauranteId": "UUID"
    }
  ]
  ```
  - **403 Forbidden**: If the restaurant is not found.

### Update Ingredient
- **PUT** `/ingredientes/{id}`
- **Description**: Updates an existing ingredient.
- **Request Body**:
  ```json
  {
    "nome": "string",
    "quantidade": "number"
  }
  ```
- **Response**:
  - **200 OK**: Returns the updated ingredient.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "quantidade": "number",
    "restauranteId": "UUID"
  }
  ```
  - **403 Forbidden**: If the restaurant is not found.

### Get Ingredients by Restaurant
- **GET** `/ingredientes/{restauranteId}`
- **Description**: Retrieves a list of ingredients associated with a specific restaurant.
- **Response**:
  - **200 OK**: Returns a list of ingredients.
  ```json
  [
    {
      "id": "UUID",
      "nome": "string",
      "quantidade": "number",
      "restauranteId": "UUID"
    }
  ]
  ```

### Get Ingredient by ID
- **GET** `/ingredientes/{id}`
- **Description**: Retrieves a specific ingredient by its ID.
- **Response**:
  - **200 OK**: Returns the ingredient.
  ```json
  {
    "id": "UUID",
    "nome": "string",
    "quantidade": "number",
    "restauranteId": "UUID"
  }
  ```
  - **404 Not Found**: If the ingredient is not found.

### Delete Ingredient
- **DELETE** `/ingredientes/{id}`
- **Description**: Deletes a specific ingredient by its ID.
- **Response**:
  - **204 No Content**: If the ingredient is successfully deleted.
  - **403 Forbidden**: If the restaurant is not found.

