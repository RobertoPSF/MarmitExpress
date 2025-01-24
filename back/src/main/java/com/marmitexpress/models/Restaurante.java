package com.marmitexpress.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Restaurante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID gerado automaticamente
    private String avaliacao;
    private String usuario;
    private String senha;
    private String nome;
    private String endereco;
    private String telefone;
    private byte[] foto;
    private boolean aceitandoPedidos;

    @OneToMany(mappedBy = "restaurante")
    private List<Item> listaDeItens;

    public Restaurante(String avaliacao, String usuario, String senha, String nome, String endereco, byte[] foto, String telefone, boolean aceitandoPedidos) {
        this.avaliacao = avaliacao;
        this.usuario = usuario;
        this.senha = senha;
        this.nome = nome;
        this.endereco = endereco;
        this.foto = foto;
        this.telefone = telefone;
        this.aceitandoPedidos = aceitandoPedidos;
    }

    public Long getId() {
        return id;
    }
    public String getAvaliacao() {
        return avaliacao;
    }
    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
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
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEndereco() {
        return endereco;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public byte[] getFoto() {
        return foto;
    }
    public void setFoto(byte[] foto) {
        this.foto = foto;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public boolean isAceitandoPedidos() {
        return aceitandoPedidos;
    }
    public void setAceitandoPedidos(boolean aceitandoPedidos) {
        this.aceitandoPedidos = aceitandoPedidos;
    }
    public List<Item> getListaDeItens() {
        return listaDeItens;
    }
    public void setListaDeItens(Item item) {
        this.listaDeItens.add(item);
    }
}
