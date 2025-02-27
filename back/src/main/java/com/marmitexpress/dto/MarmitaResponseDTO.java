package com.marmitexpress.dto;

import java.util.List;

public record MarmitaResponseDTO (
     Long id,
     String nome,
     Double preco,
     Integer quantidade,
     List<String> ingredientes,
     Long restauranteId
) {}
