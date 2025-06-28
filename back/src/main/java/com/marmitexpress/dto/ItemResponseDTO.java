package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

public record ItemResponseDTO (
    UUID id,
    String nome,
    double preco,
    int quantidade,
    List<ItemIngredienteDTO> ingredientes,
    UUID restauranteId
) {}
