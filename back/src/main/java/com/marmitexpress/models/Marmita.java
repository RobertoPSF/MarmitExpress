package com.marmitexpress.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.UUID;

import java.util.List;

@Entity
public class Marmita extends Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;

    private List<String> ingredientes;

    public Marmita() {}

    public UUID getId() {return id;}

    public List<String> getIngredientes() {return ingredientes;}

    public void setIngredientes(List<String> ingredientes) {this.ingredientes = ingredientes;}
}
