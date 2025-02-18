package com.marmitexpress.models;

import jakarta.persistence.Entity;

import java.util.List;

@Entity
public class Marmita extends Item {
    private List<String> ingredientes;

    public Marmita() {
        super();
    }

    public Marmita(String tipo, double preco, int quantidade, byte[] foto, Restaurante restaurante, List<String> ingredientes) {
        super(tipo, preco, quantidade, foto, restaurante);
        this.ingredientes = ingredientes;
    }
    
    public List<String> getIngredientes() {
        return ingredientes;
    }
    
    public void setIngredientes(List<String> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
