package com.marmitexpress.dto;

import java.util.UUID;

public class PagamentoDTO {
    private String descricao;
    private UUID idPedido;

    public PagamentoDTO() {}

    public PagamentoDTO(String descricao, UUID idPedido) {
        this.descricao = descricao;
        this.idPedido = idPedido;
    }

    public String getDescricao() {return descricao;}

    public void setDescricao(String descricao) {this.descricao = descricao;}

    public UUID getIdPedido() {return idPedido;}

    public void setIdPedido(UUID idPedido) {this.idPedido = idPedido;}
}

