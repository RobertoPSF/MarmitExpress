package com.marmitexpress.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Column;
import java.util.List;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID gerado automaticamente

    @Column(unique = true)
    private String usuario;
    private String senha;
    private String endereco;
    private String nome;
    private String telefone;

    @OneToMany(mappedBy = "usuario")
    private List<Pedido> listaDePedidos;

    // Getters e Setters

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) { // Adicionando o método setId
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
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
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public List<Pedido> getListaDePedidos() {
        return listaDePedidos;
    }
    public void setListaDePedidos(Pedido pedido) {
        this.listaDePedidos.add(pedido);
    }
}
