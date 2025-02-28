package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

public record MarmitaResponseDTO (
    UUID id,
    String nome,
    Double preco,
    Integer quantidade,
    List<String> ingredientes,
    UUID restauranteId
) {}
