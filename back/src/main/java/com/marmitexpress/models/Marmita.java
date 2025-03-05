package com.marmitexpress.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Marmita extends Item {

    @ManyToMany
    @JoinTable(
        name = "marmita_ingrediente",
        joinColumns = @JoinColumn(name = "marmita_id"),
        inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )
    private List<Ingrediente> ingredientes;

    public Marmita() {}

    public Marmita(String nome, double preco, int quantidade, Restaurante restaurante, List<Ingrediente> ingredientes) {
        super(nome, preco, quantidade, restaurante);
        this.ingredientes = ingredientes;
    }

    public List<Ingrediente> getIngredientes() {return ingredientes;}

    public void setIngredientes(List<Ingrediente> ingredientes) {this.ingredientes = ingredientes;}
}
