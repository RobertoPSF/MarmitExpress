# Documentação da API de Pagamentos - MarmitExpress

## Endpoints

### 1. Obter Payload do QR Code

**GET** `/pagamentos/{id}/qrcode`

#### Descrição
Recupera o payload do QR code para um pagamento específico identificado pelo seu ID.

#### Resposta de Sucesso (200 OK)
```json
{
  "payload": "string"
}
```
### Resposta de Erro (404 Not Found)
```json
{
  "error": "Pagamento não encontrado."
}
```

### 2. Confirmar Pagamento
**PATCH** `/pagamentos/{id}/confirmar`

### Descrição
Confirma um pagamento identificado pelo seu ID.

### Resposta de Sucesso (200 OK)
```json
"Pagamento confirmado com sucesso."
```

### Resposta de Erro (404 Not Found)
```json
{
  "error": "Pagamento não encontrado ou já confirmado."
}
```

### 3. Criar Pagamento
**POST** `/pagamentos`

#### Nota
Os pedidos não podem ser feitos se o restaurante não estiver aceitando pedidos.


#### Descrição
Cria um novo pagamento associado a um pedido.

#### Parâmetros da Requisição
- `descricao` (String) - Descrição do pagamento.
- `idPedido` (UUID) - ID do pedido associado ao pagamento.

#### Resposta de Sucesso (200 OK)
```json
{
  "id": "uuid",
  "valor": 50.00,
  "descricao": "Pagamento de pedido",
  "status": "PENDENTE"
}
```

### 4. Verificar Status do Pagamento
**GET** `/pagamentos/{id}/status`

#### Descrição
Verifica o status de um pagamento específico.

#### Resposta de Sucesso (200 OK)
```json
"PAGO"
```
#### Resposta de Erro (403 Forbidden)
```json
{
  "error": "Acesso negado."
}
