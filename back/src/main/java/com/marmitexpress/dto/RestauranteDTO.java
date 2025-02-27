package com.marmitexpress.dto;

public class RestauranteDTO {
    private String nome;
    private String email;
    private String senha;
    private String endereco;
    private String telefone;
    private String descricao;
    private Boolean aceitandoPedidos;
    private String chavePix;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean getAceitandoPedidos() {
        return aceitandoPedidos;
    }

    public void setAceitandoPedidos(Boolean aceitandoPedidos) {
        this.aceitandoPedidos = aceitandoPedidos;
    }

    public String getChavePix() {
        return chavePix;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }
}
