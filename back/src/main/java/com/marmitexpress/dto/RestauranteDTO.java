package com.marmitexpress.dto;

import java.util.List;

import com.marmitexpress.models.Item;

public class RestauranteDTO {
    private String avaliacao;
    private String usuario;
    private String senha;
    private String nome;
    private String endereco;
    private String telefone;
    private List<Item> listaDeItens;
    private byte[] foto;
    private boolean aceitandoPedidos;

    public RestauranteDTO(String avaliacao, String usuario, String senha, String nome, String endereco, byte[] foto, String telefone, boolean aceitandoPedidos) {
        this.avaliacao = avaliacao;
        this.usuario = usuario;
        this.senha = senha;
        this.nome = nome;
        this.endereco = endereco;
        this.foto = foto;
        this.telefone = telefone;
        this.aceitandoPedidos = aceitandoPedidos;
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

    @Override
    public String toString() {
        return "RestauranteDTO{" +
                "foto=" + foto +
                ", nome='" + nome + '\'' +
                ", usuario='" + usuario + '\'' +
                ", senha='" + senha + '\'' +
                ", avaliacao='" + avaliacao + '\'' +
                ", endereco='" + endereco + '\'' +
                ", telefone='" + telefone + '\'' +
                ", aceitandoPedidos=" + aceitandoPedidos +
                ", itens=" + listaDeItens +
                '}';
    }
}
