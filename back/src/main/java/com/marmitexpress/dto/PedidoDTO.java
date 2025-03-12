package com.marmitexpress.dto;

import com.marmitexpress.models.Pedido;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class PedidoDTO {
    private UUID id;
    private UUID clienteId;
    private UUID restauranteId;
    private String status;

    public PedidoDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.clienteId = pedido.getCliente().getId();
        this.restauranteId = pedido.getRestaurante().getId();
        
    }
}