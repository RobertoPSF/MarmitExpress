package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

import com.marmitexpress.models.Ingrediente;

public record MarmitaResponseDTO (
    UUID id,
    String nome,
    Double preco,
    Integer quantidade,
    List<Ingrediente> ingredientes,
    UUID restauranteId
) {}
