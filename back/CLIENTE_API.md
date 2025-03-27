# Documentação da API de Clientes - MarmitExpress


## Endpoints

### 1. Listar Todos os Clientes

**GET** `/clientes`

#### Resposta de Sucesso (200 OK)
```json
[
  {
    "id": "uuid",
    "nome": "Nome do Cliente",
    "email": "cliente@email.com",
    "endereco": "Endereço do Cliente",
    "telefone": "Telefone do Cliente"
  }
]
```

---
### 2. Buscar Perfil do Cliente

**GET** `/clientes/me`

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "nome": "Nome do Cliente",
  "email": "cliente@email.com",
  "endereco": "Endereço do Cliente",
  "telefone": "Telefone do Cliente"
}
```

#### Resposta de Erro (404 Not Found)
```json
{
  "message": "Cliente não encontrado"
}
```

---
### 3. Atualizar Dados do Cliente

**PUT** `/clientes/me`

#### Corpo da Requisição
```json
{
  "nome": "Novo Nome",
  "endereco": "Novo Endereço",
  "telefone": "Novo Telefone"
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "nome": "Novo Nome",
  "email": "cliente@email.com",
  "endereco": "Novo Endereço",
  "telefone": "Novo Telefone"
}
```

#### Resposta de Erro (404 Not Found)
```json
{
  "message": "Cliente não encontrado"
}
```

---
### 4. Deletar Cliente
**DELETE** `/clientes/{id}`

#### Resposta de Sucesso (204 No Content)

---
```
