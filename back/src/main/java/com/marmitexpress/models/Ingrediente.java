package com.marmitexpress.models;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;
    private String nome;

    public Ingrediente() {}

    public Ingrediente(String nome) {this.nome = nome;}

    public UUID getId() {return id;}

    public String getNome() {return nome;}
    
    public void setNome(String nome) {this.nome = nome;}
}
