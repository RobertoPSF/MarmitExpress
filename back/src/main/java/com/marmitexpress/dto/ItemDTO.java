package com.marmitexpress.dto;

public class ItemDTO {
    private String nome;
    private Double preco;
    private Integer quantidade;
    private Long restauranteId;

    public ItemDTO() {}

    public ItemDTO(String nome, Double preco, Integer quantidade, Long restauranteId) {
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

    public Long getRestauranteId() { return restauranteId; }
    public void setRestauranteId(Long restauranteId) { this.restauranteId = restauranteId; }
}
