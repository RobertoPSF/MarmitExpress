package com.marmitexpress.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cliente extends Usuario {

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedido> listaDePedidos = new ArrayList<>();

    public Cliente() {
        this.setRole(UsuarioRole.CLIENTE);
    }

    public Cliente(String nome, String email, String senha, String endereco, String telefone) {
        this.setNome(nome);
        this.setEmail(email);
        this.setSenha(senha);
        this.setRole(UsuarioRole.CLIENTE);
        this.setEndereco(endereco);
        this.setTelefone(telefone);
    }

    public List<Pedido> getListaDePedidos() {return listaDePedidos;}

    public void setListaDePedidos(List<Pedido> pedidos) {this.listaDePedidos = pedidos;}
}
