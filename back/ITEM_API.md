# Documentação da API de Items - MarmitExpress

## Introdução

A API de Itens permite que restaurantes cadastrem, gerenciem e consultem os itens do seu cardápio. Apenas restaurantes autenticados podem realizar operações nos itens que pertencem a eles.

## Endpoints

### Criar um Item

**POST /itens**

**Requisição:**

```json
{
  "nome": "Arroz com Feijão",
  "preco": 12.5,
  "quantidade": 10,
  "restauranteId": "UUID-do-restaurante",
  "ingredientes": [
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
  ]
}
```

**Resposta (200 OK):**

```json
{
  "id": "UUID-do-item",
  "nome": "Arroz com Feijão",
  "preco": 12.5,
  "quantidade": 10,
  "ingredientes": [
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

**Restrições:**

- Apenas o restaurante dono pode cadastrar um item.
- Retorna `403 Forbidden` caso o usuário autenticado não seja um restaurante.

---


### Listar todos os Items

**GET /itens**

**Resposta (200 OK):**

```json
[
  {
    "id": "UUID-do-item",
    "nome": "Arroz com Feijão",
    "preco": 12.5,
    "quantidade": 10,
    "ingredientes": [
      { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
    ],
    "restauranteId": "UUID-do-restaurante"
  }
]
```

---

### Buscar um Item por ID

**GET /itens/{id}**

**Resposta (200 OK):**

```json
{
  "id": "UUID-do-item",
  "nome": "Arroz com Feijão",
  "preco": 12.5,
  "quantidade": 10,
  "ingredientes": [
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
  ],
  "restauranteId": "UUID-do-restaurante"
}

```

**Restrições:**

- Retorna `404 Not Found` caso o item não exista.

---

### Atualizar um Item

**PUT /itens/{id}**

**Requisição:**

```json
{
  "nome": "Arroz com Feijão",
  "preco": 12.5,
  "quantidade": 10,
  "restauranteId": "UUID-do-restaurante",
  "ingredientes": [
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
  ]
}
```

**Resposta (200 OK):**

```json
{
  "id": "UUID-do-item",
  "nome": "Arroz com Feijão",
  "preco": 12.5,
  "quantidade": 10,
  "ingredientes": [
    { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
  ],
  "restauranteId": "UUID-do-restaurante"
}
```

**Restrições:**

- Apenas o restaurante dono pode atualizar um item.
- Retorna `403 Forbidden` caso o usuário autenticado não seja o dono do item.

---

### Deletar um Item

**DELETE /itens/{id}**

**Resposta (204 No Content)**

**Restrições:**

- Apenas o restaurante dono pode deletar um item.
- Retorna `403 Forbidden` caso o usuário autenticado não seja o dono do item.

---


### Buscar Itens de um Restaurante

**GET /itens/restaurante/{restauranteId}**

**Resposta (200 OK):**

```json
[
  {
    "id": "UUID-do-item",
    "nome": "Arroz com Feijão",
    "preco": 12.5,
    "quantidade": 10,
    "ingredientes": [
      { "ingredienteId": "UUID-do-ingrediente", "quantidade": 100 }
    ],
    "restauranteId": "UUID-do-restaurante"
  }
]
```

**Restrições:**

- Apenas restaurantes autenticados podem acessar seus itens.
- Retorna `403 Forbidden` caso o usuário autenticado não seja um restaurante.

---

## Observações

- Todos os endpoints que requerem autenticação validam o restaurante pelo email cadastrado.
- Para qualquer erro de permissão ou item inexistente, a API retorna os códigos apropriados (`403` ou `404`).
- Ao criar um pedido, o sistema verifica o estoque de todos os ingredientes necessários para os itens do pedido.
- Se faltar algum ingrediente, o pedido não será criado e uma mensagem de erro será retornada.
- O estoque dos ingredientes é descontado apenas após a verificação de disponibilidade para todo o pedido.