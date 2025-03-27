package com.marmitexpress.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Map; // Added import for Map
import java.util.UUID;

@Getter
@Setter
public class PedidoRequestDTO {
    private Map<UUID, Integer> itensQuantidades; // Map of product IDs to their requested quantities
    private UUID restauranteId;
    private String endereco;
}
