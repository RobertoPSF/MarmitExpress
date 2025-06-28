# API de Pedidos - MarmitExpress

## Endpoints

### Criar Pedido

**POST** `/pedidos`

#### Descrição
Cria um novo pedido para o cliente autenticado.  
**Agora o sistema verifica o estoque de cada ingrediente dos itens/marmitas do pedido. Se faltar algum ingrediente, o pedido não será criado.**

#### Requisição
```json
{
  "itens": [
    {
      "itemId": "UUID do item",
      "quantidade": 2
    }
  ],
  "endereco": "Rua Exemplo, 123",
  "restauranteId": "UUID do restaurante"
}
```

#### Resposta
- **200 OK**: Pedido criado com sucesso.
- **400 Bad Request**: 
{
  "message": "Estoque insuficiente para o ingrediente: Arroz"
}.

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

### Resumo do Pedido

**GET** `/pedidos/{id}/resumo`

#### Descrição
Retorna um resumo detalhado do pedido, incluindo informações do cliente, endereço de entrega, itens, quantidades, ingredientes personalizados (se houver), preços e subtotal.  
Disponível para o cliente dono do pedido e para o restaurante responsável.

#### Resposta (200 OK):

```json
{
  "idPedido": 123,
  "status": "PENDENTE",
  "nomeCliente": "João da Silva",
  "enderecoRestaurante": "Rua do Restaurante, 123",
  "itens": [
    {
      "nomeItem": "Marmita de Frango",
      "quantidade": 2,
      "precoUnitario": 20.0,
      "subtotal": 40.0,
      "ingredientes": ["Sem cebola", "Extra batata"]
    }
  ],
  "precoTotal": 40.0
}
```

- **403 Forbidden**: Se o usuário não for o cliente dono ou o restaurante responsável.
- **404 Not Found**: Se o pedido não existir.

---
## Observações sobre Controle de Estoque

- Ao criar um pedido, o sistema verifica o estoque de todos os ingredientes necessários para os itens/marmitas do pedido.
- Se faltar algum ingrediente, o pedido não será criado e uma mensagem de erro será retornada.
- O estoque dos ingredientes é descontado apenas após a verificação de disponibilidade para todo o pedido.
