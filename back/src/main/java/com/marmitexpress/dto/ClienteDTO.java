package com.marmitexpress.dto;

import java.util.List;

import com.marmitexpress.models.Pedido;

public class ClienteDTO {
    private String usuario;
    private String senha;
    private String endereco;
    private String nome;
    private String telefone;
    private List<Pedido> listaDePedidos;

    public ClienteDTO(String usuario, String senha, String endereco, String nome, String telefone) {
        this.usuario = usuario;
        this.senha = senha;
        this.endereco = endereco;
        this.nome = nome;
        this.telefone = telefone;
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

    @Override
    public String toString() {
        return "ClienteDTO{" +
                "usuario='" + usuario + '\'' +
                ", senha='" + senha + '\'' +
                ", endereco='" + endereco + '\'' +
                ", nome='" + nome + '\'' +
                ", telefone='" + telefone + '\'' +
                ", pedidos=" + listaDePedidos + '\'' +
                '}';
    }
}
