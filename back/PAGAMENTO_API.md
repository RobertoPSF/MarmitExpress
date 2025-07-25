# API de Pagamentos - MarmitExpress

## Introdução
A API de Pagamentos do MarmitExpress permite a criação, consulta e confirmação de pagamentos. Esta API suporta transações via PIX, fornecendo payloads para QR Code e atualizando o status dos pagamentos.

## Endpoints

### 1. Criar Pagamento

**POST** `/pagamentos`

#### Request Body:

```json
{
  "descricao": "Pedido de almoço",
  "idPedido": "UUID do pedido"
}
```

#### Response (200 OK):

```json
{
  "id": "UUID do pagamento",
  "valor": 25.5,
  "status": "PENDENTE",
  "descricao": "Pedido de almoço",
  "qrCode": "Código QR para pagamento",
  "chavePix": "Chave PIX para pagamento",
  "dataCriacao": "2025-03-27T12:00:00",
  "dataAtualizacao": "2025-03-27T12:00:00",
  "pedido": {
    "id": "uuid_do_pedido",
    "clienteId": "uuid_do_cliente",
    "restauranteId": "uuid_do_restaurante",
    "status": "EM_PROCESSAMENTO",
    "precoTotal": 50.0,
    "itens": [
      {
        "nomeItem": "Marmita de Frango",
        "quantidade": 2,
        "precoUnitario": 20.0,
        "subtotal": 40.0,
        "ingredientes": ["Sem cebola", "Extra batata"]
      },
      {
        "nomeItem": "Suco de Laranja",
        "quantidade": 1,
        "precoUnitario": 10.0,
        "subtotal": 10.0,
        "ingredientes": []
      }
    ]
  }
}
```

#### Respostas:
- `403 FORBIDDEN`: Se o cliente não estiver autenticado.

---

### 2. Obter Payload PIX para o FRONT-END gerar o QrCode do pagamento

**GET** `/pagamentos/{id}/payload`

#### Response (200 OK):

```json
{
  "payload": "payload PIX para pagamento"
}
```

#### Respostas:
- `403 FORBIDDEN`: Se o cliente não estiver autenticado.
- `404 NOT FOUND`: Se o pagamento não for encontrado.

---

### 3. Confirmar Pagamento

**PATCH** `/pagamentos/{id}/confirmar`

#### Response (200 OK):

```json
"Pagamento confirmado com sucesso."
```

#### Respostas:
- `403 FORBIDDEN`: Se o usuário não for um restaurante autorizado.
- `404 NOT FOUND`: Se o pagamento já estiver confirmado ou não existir.

---

### 4. Verificar Status do Pagamento

**GET** `/pagamentos/{id}/status`

#### Response (200 OK):

```json
"PENDENTE"
```

#### Respostas:

- `403 FORBIDDEN`: Se o pagamento não pertencer ao cliente autenticado.
- `404 NOT FOUND`: Se o pagamento não existir.
---
## Observações

- O pagamento só pode ser criado se houver estoque suficiente para todos os ingredientes dos itens do pedido.
- O status do pagamento reflete o status do pedido.
- O campo `itens` do objeto `pedido` detalha cada item, quantidade, preço e ingredientes personalizados (se houver).