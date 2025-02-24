package com.marmitexpress.dto;

public class LoginDTO {
    private String email;
    private String senha;

    public String getUsuario() {
        return email;
    }

    public void setUsuario(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
