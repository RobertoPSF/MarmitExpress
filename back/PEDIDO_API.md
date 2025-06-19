<<<<<<< HEAD
# PEDIDO_API.md

## API de Pedidos - MarmitExpress

Esta API gerencia pedidos no sistema MarmitExpress. A seguir estão os endpoints disponíveis para manipulação de pedidos.

---

## **1. Criar Pedido**

**Endpoint:**
```http
POST /pedidos
```

**Descrição:**
Cria um novo pedido para um cliente autenticado.

**Requisição:**
- **Body (JSON):**
  ```json
  {
    "itensQuantidades": {
      "item_id1": quantidade,
      "item_id2": quantidade
    },
    "restauranteId": "uuid_do_restaurante",
    "endereco": "Endereço de entrega"
  }
  ```

**Resposta:**
- **200 OK:** Pedido criado com sucesso.
- **400 Bad Request:** Erro na criação do pedido.

---

## **2. Listar Pedidos do Cliente**

**Endpoint:**
```http
GET /pedidos/cliente
```

**Descrição:**
Retorna a lista de pedidos do cliente autenticado.

**Requisição:**
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```

**Resposta:**
- **200 OK:** Retorna uma lista de pedidos do cliente.
  ```json
  [
    {
      "id": "uuid_do_pedido",
      "clienteId": "uuid_do_cliente",
      "restauranteId": "uuid_do_restaurante",
      "status": "EM_PROCESSAMENTO",
      "precoTotal": 50.0,
      "itensIds": ["uuid_item1", "uuid_item2"]
=======
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
>>>>>>> front
    }
  ],
  "endereco": "Rua Exemplo, 123",
  "restauranteId": "UUID do restaurante"
}
```

<<<<<<< HEAD
---

## **3. Buscar Pedido por ID**

**Endpoint:**
```http
GET /pedidos/{id}
```

**Descrição:**
Busca um pedido pelo seu ID (disponível para restaurante/admin).

**Parâmetros:**
- `id` (UUID) - ID do pedido a ser buscado.

**Resposta:**
- **200 OK:** Retorna os detalhes do pedido.
- **404 Not Found:** Pedido não encontrado.

---

## **4. Cancelar Pedido**

**Endpoint:**
```http
DELETE /pedidos/{id}
```

**Descrição:**
Permite que o cliente autenticado cancele um pedido.

**Parâmetros:**
- `id` (UUID) - ID do pedido a ser cancelado.

**Requisição:**
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```

**Resposta:**
- **200 OK:** Pedido cancelado com sucesso.
- **403 Forbidden:** Cliente não tem permissão para cancelar o pedido.
- **404 Not Found:** Pedido não encontrado.

---

## **Estruturas de Dados**

### **PedidoDTO** (Resposta)
```json
{
  "id": "uuid_do_pedido",
  "clienteId": "uuid_do_cliente",
  "restauranteId": "uuid_do_restaurante",
  "status": "EM_PROCESSAMENTO",
  "precoTotal": 50.0,
  "itensIds": ["uuid_item1", "uuid_item2"]
}
```

### **PedidoRequestDTO** (Requisição)
```json
{
  "itensQuantidades": {
    "item_id1": quantidade,
    "item_id2": quantidade
  },
  "restauranteId": "uuid_do_restaurante",
  "endereco": "Endereço de entrega"
}
```

---

=======
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
>>>>>>> front
