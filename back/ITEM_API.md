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
  "preco": 12.50,
  "quantidade": 10,
  "restauranteId": "UUID-do-restaurante"
}
```

**Resposta (200 OK):**
```json
{
  "id": "UUID-do-item",
  "nome": "Arroz com Feijão",
  "preco": 12.50,
  "quantidade": 10,
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
    "preco": 12.50,
    "quantidade": 10,
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
  "preco": 12.50,
  "quantidade": 10,
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
  "nome": "Feijoada",
  "preco": 15.00,
  "quantidade": 5
}
```

**Resposta (200 OK):**
```json
{
  "id": "UUID-do-item",
  "nome": "Feijoada",
  "preco": 15.00,
  "quantidade": 5,
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

### Buscar Items de um Restaurante

**GET /itens/restaurante/{restauranteId}**

**Resposta (200 OK):**
```json
[
  {
    "id": "UUID-do-item",
    "nome": "Arroz com Feijão",
    "preco": 12.50,
    "quantidade": 10,
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
