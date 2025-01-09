package com.marmitexpress.dto;

public class MarmitaDTO {

    private Long id;
    private String nome;
    private String descricao;
    private Double preco;
    private Long restauranteId; // ID do restaurante associado à marmita

    // Construtores
    public MarmitaDTO() {
    }

    public MarmitaDTO(Long id, String nome, String descricao, Double preco, Long restauranteId) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.restauranteId = restauranteId;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Long getRestauranteId() {
        return restauranteId;
    }

    public void setRestauranteId(Long restauranteId) {
        this.restauranteId = restauranteId;
    }

    // Método toString para facilitar a visualização do objeto
    @Override
    public String toString() {
        return "MarmitaDTO{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", restauranteId=" + restauranteId +
                '}';
    }
}
