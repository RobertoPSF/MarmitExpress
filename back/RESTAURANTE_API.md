# Documentação da API - RestauranteController

Esta documentação detalha os endpoints relacionados à gestão de restaurantes na plataforma MarmitExpress.

## Endpoints

### Listar todos os restaurantes
**GET** `/restaurantes`

**Resposta:**
```json
[
    {
        "id": "UUID",
        "nome": "Nome do Restaurante",
        "email": "email@restaurante.com",
        "endereco": "Endereço do restaurante",
        "telefone": "(00) 00000-0000",
        "descricao": "Breve descrição do restaurante",
        "aceitandoPedidos": true,
        "chavePix": "chave-pix",
        "ingredientes": [...],
        "listaDeItens": [...],
        "marmitas": [...]
    }
]
```

### Buscar restaurante por ID
**GET** `/restaurantes/{id}`

**Resposta:**
- **200 OK** - Restaurante encontrado
- **404 Not Found** - Restaurante inexistente

**Exemplo de resposta (200 OK):**
```json
{
    "id": "UUID",
    "nome": "Nome do Restaurante",
    "email": "email@restaurante.com",
    "endereco": "Endereço do restaurante",
    "telefone": "(00) 00000-0000",
    "descricao": "Breve descrição do restaurante",
    "aceitandoPedidos": true,
    "chavePix": "chave-pix",
    "ingredientes": [...],
    "listaDeItens": [...],
    "marmitas": [...]
}
```

### Buscar meu perfil
**GET** `/restaurantes/me`

**Resposta:**
- **200 OK** - Perfil encontrado
- **404 Not Found** - Perfil inexistente

**Exemplo de resposta:** Igual ao endpoint de busca por ID.

### Atualizar meu perfil
**PUT** `/restaurantes/me`

**Body:**
```json
{
    "nome": "Novo Nome",
    "endereco": "Novo Endereço",
    "descricao": "Nova descrição",
    "aceitandoPedidos": true,
    "chavePix": "nova-chave-pix"
}
```

**Resposta:**
- **200 OK** - Perfil atualizado com sucesso
- **404 Not Found** - Perfil inexistente

**Exemplo de resposta:** Igual ao endpoint de busca por ID.

### Deletar restaurante
**DELETE** `/restaurantes/{id}`

**Resposta:**
- **204 No Content** - Restaurante deletado com sucesso
- **404 Not Found** - Restaurante inexistente