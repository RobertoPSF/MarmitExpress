package com.marmitexpress.dto;

import java.time.LocalDateTime;

public class PedidoDTO {

    private Long id;
    private Long usuarioId; // ID do usuário que fez o pedido
    private Long marmitaId; // ID da marmita pedida
    private Integer quantidade; // Quantidade de marmitas
    private Double valorTotal; // Valor total do pedido
    private String status; // Status do pedido (ex: "Pendente", "Em preparo", "Entregue", "Cancelado")
    private LocalDateTime dataPedido; // Data e hora do pedido

    // Construtores
    public PedidoDTO() {
    }

    public PedidoDTO(Long id, Long usuarioId, Long marmitaId, Integer quantidade, Double valorTotal, String status, LocalDateTime dataPedido) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.marmitaId = marmitaId;
        this.quantidade = quantidade;
        this.valorTotal = valorTotal;
        this.status = status;
        this.dataPedido = dataPedido;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getMarmitaId() {
        return marmitaId;
    }

    public void setMarmitaId(Long marmitaId) {
        this.marmitaId = marmitaId;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataPedido() {
        return dataPedido;
    }

    public void setDataPedido(LocalDateTime dataPedido) {
        this.dataPedido = dataPedido;
    }

    // Método toString para facilitar a visualização do objeto
    @Override
    public String toString() {
        return "PedidoDTO{" +
                "id=" + id +
                ", usuarioId=" + usuarioId +
                ", marmitaId=" + marmitaId +
                ", quantidade=" + quantidade +
                ", valorTotal=" + valorTotal +
                ", status='" + status + '\'' +
                ", dataPedido=" + dataPedido +
                '}';
    }
}