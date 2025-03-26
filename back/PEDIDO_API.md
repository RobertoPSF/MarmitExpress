# Documentação da API de Pedidos - MarmitExpress

## Endpoints

### 1. Criar Pedido

**POST** `/pedidos`

#### Descrição
Cria um novo pedido para o cliente autenticado.

#### Corpo da Requisição
```json
{
  "restauranteId": "uuid",
  "itensIds": ["uuid1", "uuid2"],
  "endereco": "string"
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "restauranteId": "uuid",
  "clienteId": "uuid",
  "endereco": "string",
  "status": "PENDENTE",
  "preco": 0.0
}
```

#### Resposta de Erro (400 Bad Request)
```json
{
  "error": "Restaurante não encontrado."
}
```
```json
{
  "error": "Nenhum item encontrado."
}
```

---

### 2. Listar Pedidos do Cliente

**GET** `/pedidos/cliente`

#### Descrição
Recupera todos os pedidos do cliente autenticado.

#### Resposta de Sucesso (200 OK)
```json
[
  {
    "id": "uuid",
    "restauranteId": "uuid",
    "clienteId": "uuid",
    "endereco": "string",
    "status": "PENDENTE",
    "preco": 0.0
  }
]
```

---

### 3. Buscar Pedido por ID

**GET** `/pedidos/{id}`

#### Descrição
Recupera um pedido específico pelo seu ID.

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "restauranteId": "uuid",
  "clienteId": "uuid",
  "endereco": "string",
  "status": "PENDENTE",
  "preco": 0.0
}
```

#### Resposta de Erro (404 Not Found)
```json
{
  "error": "Pedido não encontrado."
}
```

---

### 4. Cancelar Pedido

**DELETE** `/pedidos/{id}`

#### Descrição
Cancela um pedido para o cliente autenticado.

#### Resposta de Sucesso (200 OK)
```json
"Pedido cancelado."
```

#### Resposta de Erro (403 Forbidden)
```json
{
  "error": "Você não tem permissão para cancelar este pedido."
}
```
#### Resposta de Erro (404 Not Found)
```json
{
  "error": "Pedido não encontrado."
}
