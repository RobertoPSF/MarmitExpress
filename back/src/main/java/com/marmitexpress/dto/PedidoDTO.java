package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

public class PedidoDTO {
    private List<ItemPedidoDTO> itens;
    private String endereco;
    private UUID restauranteId;

    public PedidoDTO() {}

    public PedidoDTO(List<ItemPedidoDTO> itens, String endereco, UUID restauranteId) {
        this.itens = itens;
        this.endereco = endereco;
        this.restauranteId = restauranteId;
    }

    // Getters e Setters
    public List<ItemPedidoDTO> getItens() { return itens; }
    public void setItens(List<ItemPedidoDTO> itens) { this.itens = itens; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public UUID getRestauranteId() { return restauranteId; }
    public void setRestauranteId(UUID restauranteId) { this.restauranteId = restauranteId; }
}
