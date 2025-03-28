package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

import com.marmitexpress.models.Pedido;

public record ClienteResponseDTO(
    UUID id,
    String nome,
    String email,
    String endereco,
    String telefone,
    List<Pedido> listaDePedidos
) {}