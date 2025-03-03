package com.marmitexpress.models;

import jakarta.persistence.Entity;
import java.util.List;

@Entity
public class Marmita extends Item {

    private List<String> ingredientes;

    public Marmita() {}

    public Marmita(String nome, double preco, int quantidade, Restaurante restaurante, List<String> ingredientes) {
        super(nome, preco, quantidade, restaurante);
        this.ingredientes = ingredientes;
    }

    public List<String> getIngredientes() {return ingredientes;}

    public void setIngredientes(List<String> ingredientes) {this.ingredientes = ingredientes;}
}
