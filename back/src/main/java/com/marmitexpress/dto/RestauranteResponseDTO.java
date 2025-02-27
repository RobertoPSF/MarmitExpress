package com.marmitexpress.dto;

public record RestauranteResponseDTO(
    Long id,
    String nome,
    String email,
    String endereco,
    String telefone,
    String descricao,
    boolean aceitandoPedidos,
    String chavePix
) {}
