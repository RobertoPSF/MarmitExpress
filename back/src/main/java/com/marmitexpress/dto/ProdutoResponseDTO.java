package com.marmitexpress.dto;

import java.util.UUID;

public record ProdutoResponseDTO (
    UUID id,
    String nome,
    double preco,
    int quantidade,
    UUID restauranteId
) {}
