package com.marmitexpress.dto;

import java.util.UUID;

public record IngredienteResponseDTO (
    UUID id,
    Integer quantidade,
    String nome,
    UUID restauranteId
) {}
