package com.marmitexpress.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class PedidoDTO {
    private Map<UUID, Integer> itensQuantidades;
    private UUID restauranteId;
    private String endereco;

    public PedidoDTO() {}

    public PedidoDTO(Map<UUID, Integer> itensQuantidades, UUID restauranteId, String endereco) {
        this.itensQuantidades = itensQuantidades;
        this.restauranteId = restauranteId;
        this.endereco = endereco;
    }

    public Map<UUID, Integer> getItensQuantidades() { return itensQuantidades; }

    public void setItensQuantidades(Map<UUID, Integer> itensQuantidades) { this.itensQuantidades = itensQuantidades; }

    public UUID getRestauranteId() { return restauranteId; }
}
