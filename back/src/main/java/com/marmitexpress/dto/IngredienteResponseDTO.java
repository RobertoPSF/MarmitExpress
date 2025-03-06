package com.marmitexpress.dto;

import java.util.UUID;

public record IngredienteResponseDTO (
    UUID id,
    String nome,
    UUID restauranteId
) {}
