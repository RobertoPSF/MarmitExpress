# Documentação da API Cliente

## Endpoints

### 1. Listar Clientes
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
### 2. Buscar Meu Perfil
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
### 3. Atualizar Perfil
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
### 5. Criar Pagamento
**POST** `/clientes/pagamentos`

#### Parâmetros da Requisição
- `valor` (Double) - Valor do pagamento
- `descricao` (String) - Descrição do pagamento

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "valor": 50.00,
  "descricao": "Pagamento de pedido",
  "status": "PENDENTE"
}
```

---
### 6. Gerar QR Code para Pagamento
**GET** `/clientes/pagamentos/{id}/qr-code`

#### Resposta de Sucesso (200 OK)
- Retorna a imagem do QR Code no formato PNG

---
### 7. Verificar Status do Pagamento
**GET** `/clientes/pagamentos/{id}/status`

#### Resposta de Sucesso (200 OK)
```json
"PAGO"
```
