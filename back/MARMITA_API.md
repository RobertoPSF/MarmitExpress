# Documentação da API de Marmitas - MarmitExpress

## Endpoints


## Endpoints

### 1. Criar Marmita

**POST** `/marmitas`

#### Requisição
```json
{
  "nome": "Marmita Especial",
  "preco": 25.50,
  "quantidade": 10,
  "ingredientes": [
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 },
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 80 }
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
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 },
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 80 }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

### 2. Listar Todas as Marmitas

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
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
    ],
    "restauranteId": "UUID-do-restaurante"
  }
]
```

### 3. Buscar Marmita por ID

**GET** `/marmitas/{id}`

#### Resposta
```json
{
  "id": "UUID-gerado",
  "nome": "Marmita Fit",
  "preco": 20.00,
  "quantidade": 3,
  "ingredientes": [
  { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

### 4. Listar Marmitas de um Restaurante

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
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
    ],
    "restauranteId": "UUID-do-restaurante"
  }
]
```

### 5. Atualizar Marmita

**PUT** `/marmitas/{id}`

#### Requisição
```json
{
  "nome": "Marmita Premium",
  "preco": 35.00,
  "quantidade": 12,
  "ingredientes": [
  { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
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

### 6. Deletar Marmita

**DELETE** `/marmitas/{id}`

#### Resposta
- **204 No Content** caso a exclusão seja bem-sucedida.
- **403 Forbidden** se o restaurante não tiver permissão para excluir.
## Observações

- O campo `ingredientes` deve conter a lista de ingredientes e a quantidade de cada um usada na receita da marmita.
- O estoque dos ingredientes é verificado e descontado apenas após a confirmação do pedido.
- Alterações na receita afetam apenas pedidos futuros.