# API de Pedidos - MarmitExpress

## Endpoints

### Criar Pedido

**POST** `/pedidos`

#### Descrição
Cria um novo pedido para o cliente autenticado.

#### Requisição
```json
{
  "itens": [
    {
      "itemId": "UUID do item",
      "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
      "quantidade": 1
    }
  ],
  "endereco": "Rua Exemplo, 123",
  "restauranteId": "UUID do restaurante"
}
```

#### Resposta
- **200 OK**: Pedido criado com sucesso.
- **400 Bad Request**: Erro ao criar pedido.

---

### Listar Pedidos do Cliente

**GET** `/pedidos/cliente`

#### Descrição
Retorna todos os pedidos do cliente autenticado.

#### Requisição
Cabeçalho:
```
Authorization: Bearer <token>
```

#### Resposta
```json
[
  {
    "id": "UUID do pedido",
    "status": "PENDENTE",
    "endereco": "Endereço do pedido",
    "precoTotal": 25.50,
    "itensIds": ["item 1", "item 2"]
  }
]
```

- **200 OK**: Lista de pedidos retornada com sucesso.

---

### Buscar Pedido por ID

**GET** `/pedidos/{id}`

#### Descrição
Busca um pedido pelo seu ID. Apenas restaurantes e administradores podem acessar este endpoint.

#### Resposta
```json
{
  "id": "UUID do pedido",
  "clienteId": "UUID do cliente",
  "restauranteId": "UUID do restaurante",
  "status": "ENTREGUE",
  "precoTotal": 30.00,
  "itensIds": ["itens"]
}
```

- **200 OK**: Pedido encontrado.
- **404 Not Found**: Pedido não encontrado.

---

### Cancelar Pedido

**DELETE** `/pedidos/{id}`

#### Descrição
Permite que o cliente cancele um pedido, desde que ele seja o dono do pedido.

#### Requisição
Cabeçalho:
```
Authorization: Bearer <token>
```

#### Resposta
- **200 OK**: Pedido cancelado com sucesso.
- **403 Forbidden**: Cliente não tem permissão para cancelar este pedido.
- **404 Not Found**: Pedido não encontrado.

---

### Atualizar Status do Pedido

**PUT** `/pedidos/{id}/status`

#### Descrição
Permite que restaurantes e administradores atualizem o status do pedido.

#### Requisição
```json
{
  "id": "UUID do pedido",
  "status": "EM_PREPARO|PRONTO|A_CAMINHO|ENTREGUE"
}
```

#### Resposta
```json
{
  "id": "UUID do pedido",
  "status": "PENDENTE",
  "endereco": "Endereço do pedido",
  "precoTotal": 25.50,
  "itensIds": ["item 1", "item 2"]
}
```

- **200 OK**: Status atualizado com sucesso.
- **404 Not Found**: Pedido não encontrado.

---

### Marcar Pedido como Entregue

**PUT** `/pedidos/{id}/entregar`

#### Descrição
Altera o status do pedido para **ENTREGUE**.

#### Resposta
```json
{
  "id": "UUID do pedido",
  "status": "PENDENTE",
  "endereco": "Endereço do pedido",
  "precoTotal": 25.50,
  "itensIds": ["item 1", "item 2"]
}
```

- **200 OK**: Pedido marcado como entregue.
- **404 Not Found**: Pedido não encontrado.

---
