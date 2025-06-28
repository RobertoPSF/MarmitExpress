package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class MarmitaDTO {
    private String nome;
    private Double preco;
    private Integer quantidade;
    private List<ItemIngredienteDTO> ingredientes;
    private UUID restauranteId;

    public MarmitaDTO() {}

    public MarmitaDTO(String nome, Double preco, Integer quantidade, List<ItemIngredienteDTO> ingredientes, UUID restauranteId) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.ingredientes = ingredientes;
        this.restauranteId = restauranteId;
    }
    
}
