# Documentação da API de Ingredientes - MarmitExpress


## Endpoints

### 1. Criar Ingrediente no Cardápio

**POST** `/ingredientes`

#### Corpo da Requisição
```json
{
  "nome": "Nome do Ingrediente"
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "nome": "Nome do Ingrediente",
  "restauranteId": "uuid"
}
```

#### Resposta de Erro (403 Forbidden)
```json
{
  "message": "Acesso negado"
}
```

---
### 2. Listar Ingredientes do Restaurante

**GET** `/ingredientes`

#### Resposta de Sucesso (200 OK)
```json
[
  {
    "id": "uuid",
    "nome": "Nome do Ingrediente",
    "restauranteId": "uuid"
  }
]
```

#### Resposta de Erro (403 Forbidden)
```json
{
  "message": "Acesso negado"
}
```

---
### 3. Atualizar Dados do Ingrediente

**PUT** `/ingredientes/{id}`

#### Corpo da Requisição
```json
{
  "nome": "Novo Nome do Ingrediente"
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "nome": "Novo Nome do Ingrediente",
  "restauranteId": "uuid"
}
```

#### Resposta de Erro (403 Forbidden)
```json
{
  "message": "Acesso negado"
}
```

---
### 4. Listar Ingredientes de um Restaurante Específico

**GET** `/ingredientes/restaurante/{restauranteId}`

#### Resposta de Sucesso (200 OK)
```json
[
  {
    "id": "uuid",
    "nome": "Nome do Ingrediente",
    "restauranteId": "uuid"
  }
]
```

---
### 5. Buscar Ingrediente por ID

**GET** `/ingredientes/{id}`

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "nome": "Nome do Ingrediente",
  "restauranteId": "uuid"
}
```

---
### 6. Deletar Ingrediente do Cardápio

**DELETE** `/ingredientes/{id}`

#### Resposta de Sucesso (204 No Content)

#### Resposta de Erro (403 Forbidden)
```json
{
  "message": "Acesso negado"
}
```
