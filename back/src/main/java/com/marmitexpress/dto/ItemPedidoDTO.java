package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;
import lombok.*;

@Getter
@Setter
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
}
