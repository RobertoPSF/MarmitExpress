package com.marmitexpress.models;

import jakarta.persistence.Entity;

@Entity
public class Admin extends Usuario {

    public Admin() {
        this.setRole(UsuarioRole.ADMIN);
    }

    public Admin(String nome, String email, String senha, String endereco, String telefone) {
        this.setNome(nome);
        this.setEmail(email);
        this.setSenha(senha);
        this.setRole(UsuarioRole.ADMIN);
        this.setEndereco(endereco);
        this.setTelefone(telefone);
    }
}
