# Documentação da API de Marmitas - MarmitExpress

## Endpoints

### Criar Marmita
**POST** `/marmitas`

#### Requisição
```json
{
  "nome": "Marmita Especial",
  "preco": 25.50,
  "quantidade": 10,
  "ingredientes": [
    { "id": "UUID-do-ingrediente", "nome": "Arroz" },
    { "id": "UUID-do-ingrediente", "nome": "Feijão" }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

#### Resposta
```json
{
  "id": "UUID-gerado",
  "nome": "Marmita Especial",
  "preco": 25.50,
  "quantidade": 10,
  "ingredientes": [
    { "id": "UUID-do-ingrediente", "nome": "Arroz" },
    { "id": "UUID-do-ingrediente", "nome": "Feijão" }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

### Listar Todas as Marmitas
**GET** `/marmitas`

#### Resposta
```json
[
  {
    "id": "UUID-gerado",
    "nome": "Marmita Simples",
    "preco": 15.00,
    "quantidade": 5,
    "ingredientes": [
      { "id": "UUID-do-ingrediente", "nome": "Macarrão" }
    ],
    "restauranteId": "UUID-do-restaurante"
  }
]
```

### Buscar Marmita por ID
**GET** `/marmitas/{id}`

#### Resposta
```json
{
  "id": "UUID-gerado",
  "nome": "Marmita Fit",
  "preco": 20.00,
  "quantidade": 3,
  "ingredientes": [
    { "id": "UUID-do-ingrediente", "nome": "Frango" }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

### Listar Marmitas de um Restaurante
**GET** `/marmitas/restaurante/{restauranteId}`

#### Resposta
```json
[
  {
    "id": "UUID-gerado",
    "nome": "Marmita Completa",
    "preco": 30.00,
    "quantidade": 8,
    "ingredientes": [
      { "id": "UUID-do-ingrediente", "nome": "Arroz" },
      { "id": "UUID-do-ingrediente", "nome": "Carne" }
    ],
    "restauranteId": "UUID-do-restaurante"
  }
]
```

### Atualizar Marmita
**PUT** `/marmitas/{id}`

#### Requisição
```json
{
  "nome": "Marmita Premium",
  "preco": 35.00,
  "quantidade": 12,
  "ingredientes": [
    { "id": "UUID-do-ingrediente", "nome": "Peixe" }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

#### Resposta
```json
{
  "id": "UUID-gerado",
  "nome": "Marmita Premium",
  "preco": 35.00,
  "quantidade": 12,
  "ingredientes": [
    { "id": "UUID-do-ingrediente", "nome": "Peixe" }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

### Deletar Marmita
**DELETE** `/marmitas/{id}`

#### Resposta
- **204 No Content** caso a exclusão seja bem-sucedida.
- **403 Forbidden** se o restaurante não tiver permissão para excluir.

