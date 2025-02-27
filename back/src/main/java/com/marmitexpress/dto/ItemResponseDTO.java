package com.marmitexpress.dto;

public record ItemResponseDTO (
    Long id,
    String nome,
    double preco,
    int quantidade,
    Long restauranteId
) {}
