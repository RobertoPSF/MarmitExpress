package com.marmitexpress.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredienteDTO {
    private String nome;
    private UUID restauranteId;

    public IngredienteDTO() {}

    public IngredienteDTO(String nome) {
        this.nome = nome;
    }
}
