package com.marmitexpress.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class PedidoRequestDTO {
    private UUID restauranteId;
    private List<UUID> itensIds;
    private String endereco;
}