package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

public class MarmitaDTO {
    private String nome;
    private Double preco;
    private Integer quantidade;
    private List<String> ingredientes;
    private UUID restauranteId;

    public MarmitaDTO() {}

    public MarmitaDTO(String nome, Double preco, Integer quantidade, List<String> ingredientes, UUID restauranteId) {
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

    public List<String> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }

    public UUID getRestauranteId() { return restauranteId; }
    public void setRestauranteId(UUID restauranteId) { this.restauranteId = restauranteId; }
}
