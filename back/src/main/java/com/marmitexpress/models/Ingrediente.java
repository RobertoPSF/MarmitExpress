package com.marmitexpress.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.UUID;

@Entity
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;
    private String nome;

    // Default constructor
    public Ingrediente() {}

    public Ingrediente(String nome) {this.nome = nome;}

    public UUID getId() {return id;}

    public String getNome() {return nome;}
    
    public void setNome(String nome) {this.nome = nome;}
}
