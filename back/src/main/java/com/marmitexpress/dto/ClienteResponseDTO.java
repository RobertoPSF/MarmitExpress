package com.marmitexpress.dto;

public record ClienteResponseDTO(
    Long id,
    String nome,
    String email,
    String endereco,
    String telefone
) {}