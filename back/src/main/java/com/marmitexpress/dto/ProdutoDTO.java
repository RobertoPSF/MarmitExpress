package com.marmitexpress.dto;

import java.util.UUID;

public class ProdutoDTO {
    private String nome;
    private Double preco;
    private Integer quantidade;
    private UUID restauranteId;

    public ProdutoDTO() {}

    public ProdutoDTO(String nome, Double preco, Integer quantidade, UUID restauranteId) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.restauranteId = restauranteId;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public UUID getRestauranteId() { return restauranteId; }
    public void setRestauranteId(UUID restauranteId) { this.restauranteId = restauranteId; }
}
