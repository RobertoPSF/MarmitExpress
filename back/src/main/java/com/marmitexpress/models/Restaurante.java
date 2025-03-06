package com.marmitexpress.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Restaurante extends Usuario {

    @Column(nullable = true)
    private String descricao;

    private boolean aceitandoPedidos = false;

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingrediente> ingredientes = new ArrayList<>();

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> listaDeItens = new ArrayList<>();

    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Marmita> marmitas = new ArrayList<>();

    @Column(unique = true, nullable = true, length = 77)
    private String chavePix;

    public Restaurante() {
        this.setRole(UsuarioRole.RESTAURANTE);
    }

    public Restaurante(String nome, String email, String senha, String endereco, String telefone) {
        this.setNome(nome);
        this.setEmail(email);
        this.setSenha(senha);
        this.setRole(UsuarioRole.RESTAURANTE);
        this.setEndereco(endereco);
        this.setTelefone(telefone);
    }

    public boolean isAceitandoPedidos() { return aceitandoPedidos; }

    public void setAceitandoPedidos(boolean aceitandoPedidos) { this.aceitandoPedidos = aceitandoPedidos; }

    public List<Ingrediente> getIngredientes() { return ingredientes; }

    public void setIngredientes(List<Ingrediente> ingredientes) { this.ingredientes = ingredientes; }

    public void addIngrediente(Ingrediente ingrediente) {
        ingrediente.setRestaurante(this);
        this.ingredientes.add(ingrediente);
    }

    public String getDescricao() { return descricao; }

    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getChavePix() { return chavePix; }

    public void setChavePix(String chavePix) { this.chavePix = chavePix; }
}
