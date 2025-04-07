package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

public class ItemPedidoDTO {
    // Se informado, indica a marmita base registrada no banco.
    private UUID itemId;
    
    private List<String> ingredientes;
    
    // Quantidade desejada para o pedido.
    private Integer quantidade;

    public ItemPedidoDTO() {}

    public ItemPedidoDTO(UUID itemId, List<String> ingredientes, Integer quantidade) {
        this.itemId = itemId;
        this.ingredientes = ingredientes;
        this.quantidade = quantidade;
    }

    // Getters e Setters
    public UUID getItemId() { return itemId; }

    public void setItemId(UUID itemId) { this.itemId = itemId; }

    public List<String> getIngredientes() { return ingredientes; }

    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }

    public Integer getQuantidade() { return quantidade; }
    
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
}
