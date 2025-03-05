package com.marmitexpress.models;

public enum UsuarioRole {
    CLIENTE("ROLE_CLIENTE"),
    RESTAURANTE("ROLE_RESTAURANTE"),
    ADMIN("ROLE_ADMIN");

    private final String role;

    UsuarioRole(String role) {this.role = role;}

    public String getRole() {return role;}
}
