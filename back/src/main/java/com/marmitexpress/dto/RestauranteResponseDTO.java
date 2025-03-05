package com.marmitexpress.dto;

import java.util.UUID;

public record RestauranteResponseDTO(
    UUID id,
    String nome,
    String email,
    String endereco,
    String telefone,
    String descricao,
    boolean aceitandoPedidos,
    String chavePix
) {}
