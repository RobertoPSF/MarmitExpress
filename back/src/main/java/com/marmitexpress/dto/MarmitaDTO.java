package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

import com.marmitexpress.models.Ingrediente;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class MarmitaDTO {
    private String nome;
    private Double preco;
    private Integer quantidade;
    private List<Ingrediente> ingredientes;
    private UUID restauranteId;

    public MarmitaDTO() {}

    public MarmitaDTO(String nome, Double preco, Integer quantidade, List<Ingrediente> ingredientes, UUID restauranteId) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.ingredientes = ingredientes;
        this.restauranteId = restauranteId;
    }
    
}
