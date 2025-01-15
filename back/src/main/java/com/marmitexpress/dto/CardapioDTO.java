package com.marmitexpress.dto;

import java.util.List;

public class CardapioDTO {
    private Long id;
    private String nome;
    private List<Long> marmitasIds; // IDs das marmitas que fazem parte do cardápio

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

    public List<Long> getMarmitasIds() {
        return marmitasIds;
    }

    public void setMarmitasIds(List<Long> marmitasIds) {
        this.marmitasIds = marmitasIds;
    }
}