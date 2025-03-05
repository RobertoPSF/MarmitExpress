package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

import com.marmitexpress.models.Ingrediente;

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
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public List<Ingrediente> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<Ingrediente> ingredientes) { this.ingredientes = ingredientes; }

    public UUID getRestauranteId() { return restauranteId; }
    public void setRestauranteId(UUID restauranteId) { this.restauranteId = restauranteId; }
}
