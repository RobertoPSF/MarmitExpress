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
    }
  ]
  ```

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

