package com.marmitexpress.dto;

public class PagamentoDTO {
    private String descricao;
    private Long idPedido;

    public PagamentoDTO() {}

    public PagamentoDTO(String descricao, Long idPedido) {
        this.descricao = descricao;
        this.idPedido = idPedido;
    }

    public String getDescricao() {return descricao;}

    public void setDescricao(String descricao) {this.descricao = descricao;}

    public Long getIdPedido() {return idPedido;}

    public void setIdPedido(Long idPedido) {this.idPedido = idPedido;}
}

