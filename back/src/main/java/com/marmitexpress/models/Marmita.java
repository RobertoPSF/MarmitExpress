package com.marmitexpress.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.List;

@Entity
public class Marmita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private List<String> ingredientes;
    @ManyToOne
    private Restaurante restaurante;

    public Marmita() {
    }

    public Marmita(List<String> ingredientes) {
        this.ingredientes = ingredientes;
    }
    
    public Long getId() {
        return id;
    }
    
    public List<String> getIngredientes() {
        return ingredientes;
    }
    
    public void setIngredientes(List<String> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
