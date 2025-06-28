package com.marmitexpress.dto;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
public class ItemIngredienteDTO {
    private UUID ingredienteId;
    private Integer quantidade;

    public ItemIngredienteDTO() {}

    public ItemIngredienteDTO(UUID ingredienteId, Integer quantidade) {
        this.ingredienteId = ingredienteId;
        this.quantidade = quantidade;
    }
}