package com.marmitexpress.models;

import jakarta.persistence.*;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;

    private String nome;

    @ManyToOne
    @JsonIgnore
    private Restaurante restaurante;

    public Ingrediente() {}

    public Ingrediente(String nome, Restaurante restaurante) {
        this.nome = nome;
        this.restaurante = restaurante;
    }

    public UUID getId() { return id; }

    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public Restaurante getRestaurante() { return restaurante; }

    public void setRestaurante(Restaurante restaurante) { this.restaurante = restaurante; }
}
