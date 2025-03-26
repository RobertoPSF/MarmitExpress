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
### 5. Criar Pagamento do Cliente

**POST** `/clientes/pagamentos`

#### Parâmetros da Requisição
- `descricao` (String) - Descrição do pagamento
- `idPedido` (UUID) - ID do pedido associado ao pagamento

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "valor": 50.00, // O valor do pagamento é automaticamente definido como o valor total do pedido.
  "descricao": "Pagamento de pedido",
  "status": "PENDENTE"
}
```
### 6. Gerar QR Code para Pagamento do Cliente

**GET** `/clientes/pagamentos/{id}/qr-code`

#### Resposta de Sucesso (200 OK)
- Retorna a imagem do QR Code no formato PNG

---

### 7. Verificar Status do Pagamento do Cliente

**GET** `/clientes/pagamentos/{id}/status`

#### Resposta de Sucesso (200 OK)
```json
"PAGO"
```
#### Resposta de Erro (403 Forbidden)
```json
{
  "error": "Acesso negado."
}
```
