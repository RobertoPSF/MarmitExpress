# Documentação da API - RestauranteController

Esta documentação detalha os endpoints relacionados à gestão de restaurantes na plataforma MarmitExpress.
### Observação
- O campo `nomeProprietario` é obrigatório para restaurantes e deve conter o nome do titular da conta vinculada à chave PIX (Se ela for do tipo Pessoa Física).
- Para outros tipos de usuários (clientes e administradores), esse campo não é utilizado.
## Endpoints

### Listar todos os restaurantes
**GET** `/restaurantes`

**Resposta:**
```json
[
    {
        "id": "UUID",
        "nomeRestaurante": "Nome do Restaurante",
        "nomeProprietario": "Nome do Proprietário",
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
    "nomeRestaurante": "Nome do Restaurante",
    "nomeProprietario": "Nome do Proprietário",
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
    "nomeRestaurante": "Novo Nome do Restaurante",
    "nomeProprietario": "Novo Nome do Proprietário",
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