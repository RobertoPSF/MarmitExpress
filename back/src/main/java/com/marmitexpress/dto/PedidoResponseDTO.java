package com.marmitexpress.dto;

import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.DetalhePedido;
import com.marmitexpress.models.StatusPedido;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Setter
public class PedidoResponseDTO {
    private Long id;
    private UUID clienteId;
    private UUID restauranteId;
    private StatusPedido status;
    private double precoTotal;
    private List<UUID> itensIds;

    public PedidoResponseDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.clienteId = pedido.getCliente().getId();
        this.restauranteId = pedido.getRestaurante().getId();
        this.status = pedido.getStatus();
        this.precoTotal = pedido.getPreco(); // Preço total do pedido
        this.itensIds = pedido.getItens().stream()
            .map(DetalhePedido::getItem) // Obtém o Item de PedidoItem
            .map(item -> item.getId()) // Pega o UUID do Item
            .collect(Collectors.toList());
    }
}
