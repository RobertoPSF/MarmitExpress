package com.marmitexpress.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Restaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String senha;
    private String endereco;
    private String telefone;

    @OneToMany(mappedBy = "restaurante")
    private List<Marmita> marmitas;

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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public List<Marmita> getMarmitas() {
        return marmitas;
    }

    public void setMarmitas(List<Marmita> marmitas) {
        this.marmitas = marmitas;
    }
}