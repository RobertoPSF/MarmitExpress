package com.marmitexpress.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.StatusPagamento;

public record PagamentoResponseDTO(
    UUID id,
    Double valor,
    StatusPagamento status,
    String descricao,
    String qrCode,
    String chavePix,
    LocalDateTime dataCriacao,
    LocalDateTime dataAtualizacao,
    Pedido pedido
) {}
