package com.marmitexpress.dto;

import java.util.UUID;

public class IngredienteDTO {
    private String nome;
    private UUID restauranteId;

    public IngredienteDTO() {}

    public IngredienteDTO(String nome) {
        this.nome = nome;
    }

    public String getNome() {return nome;}

    public void setNome(String nome) {this.nome = nome;}

    public UUID getRestauranteId() {return restauranteId;}

    public void setRestauranteId(UUID restauranteId) {this.restauranteId = restauranteId;}
}
