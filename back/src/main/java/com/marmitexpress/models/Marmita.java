package com.marmitexpress.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;

@Entity
public class Marmita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID gerado automaticamente
    private List<String> ingredientes; // Lista de ingredientes da marmita

    // Default constructor
    public Marmita() {
    }

    public Marmita(List<String> ingredientes) {
        this.ingredientes = ingredientes;
    }
    
    public Long getId() {
        return id;
    }
    
    public List<String> getComponentes() {
        return ingredientes;
    }
    
    public void setComponentes(List<String> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
