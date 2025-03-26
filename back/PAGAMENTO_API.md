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
