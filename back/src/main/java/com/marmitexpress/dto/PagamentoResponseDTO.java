package com.marmitexpress.dto;

import java.time.LocalDateTime;

import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.StatusPagamento;

public record PagamentoResponseDTO(
    Long id,
    Double valor,
    StatusPagamento status,
    String descricao,
    String qrCode,
    String chavePix,
    LocalDateTime dataCriacao,
    LocalDateTime dataAtualizacao,
    Pedido pedido
) {}
