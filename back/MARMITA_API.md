# MARMITA API

## Introduction
The Marmita API is responsible for managing meal boxes ("marmitas") within the MarmitExpress system. It allows the creation, listing, retrieval, updating, and deletion of meal boxes associated with restaurants.

---

## Endpoints

### 1. List all meal boxes
**GET /marmitas**

**Response:**
```json
[
  {
    "id": "uuid",
    "nome": "Special Meal Box",
    "preco": 25.50,
    "quantidade": 1,
    "ingredientes": [
      { "id": "uuid", "nome": "Rice" },
      { "id": "uuid", "nome": "Beans" }
    ],
    "restauranteId": "uuid"
  }
]
```

---

### 2. List meal boxes by restaurant
**GET /marmitas/listar/{restauranteId}**

**Parameter:**
- `restauranteId` (UUID) - Restaurant identifier.

**Response:** Same as the previous endpoint.

---

### 3. Retrieve a meal box by ID
**GET /marmitas/{id}**

**Parameter:**
- `id` (UUID) - Meal box identifier.

**Response:**
```json
{
  "id": "uuid",
  "nome": "Special Meal Box",
  "preco": 25.50,
  "quantidade": 1,
  "ingredientes": [
    { "id": "uuid", "nome": "Rice" },
    { "id": "uuid", "nome": "Beans" }
  ],
  "restauranteId": "uuid"
}
```

---

### 4. Create a new meal box
**POST /marmitas**

**Request Body:**
```json
{
  "nome": "Vegan Meal Box",
  "preco": 30.00,
  "quantidade": 1,
  "ingredientes": [
    { "id": "uuid", "nome": "Chickpeas" }
  ],
  "restauranteId": "uuid"
}
```

**Response:**
```json
{
  "id": "uuid",
  "nome": "Vegan Meal Box",
  "preco": 30.00,
  "quantidade": 1,
  "ingredientes": [
    { "id": "uuid", "nome": "Chickpeas" }
  ],
  "restauranteId": "uuid"
}
```

**Restriction:**
- Only authenticated restaurants can create meal boxes.

---

### 5. Update a meal box
**PUT /marmitas/{id}**

**Parameters:**
- `id` (UUID) - Meal box identifier.

**Request Body:** Same as POST.

**Response:** Same as POST.

**Restriction:**
- Only the restaurant owner of the meal box can update it.

---

### 6. Delete a meal box
**DELETE /marmitas/{id}**

**Parameters:**
- `id` (UUID) - Meal box identifier.

**Response:**
- `204 No Content` on success.
- `403 Forbidden` if the user is not the meal box owner.

---

## Authentication Rules
- Endpoints for creating, updating, and deleting meal boxes require authentication.
- The authenticated restaurant's email is used to verify permissions.


