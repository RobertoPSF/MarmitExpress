package com.marmitexpress.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.util.UUID;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;
    
    @ManyToOne
    private Restaurante restaurante;
    
    private double preco;
    
    @ManyToOne
    private Cliente cliente;
    
    private String endereco;

    public Pedido(Restaurante restaurante, double preco, Cliente cliente, String endereco) {
        this.restaurante = restaurante;
        this.preco = preco;
        this.cliente = cliente;
        this.endereco = endereco;
    }

    public UUID getId() {return id;}

    public Restaurante getRestaurante() {return restaurante;}

    public void setRestaurante(Restaurante restaurante) {this.restaurante = restaurante;}

    public double getPreco() {return preco;}

    public void setPreco(double preco) {this.preco = preco;}

    public Cliente getCliente() {return cliente;}

    public void setCliente(Cliente cliente) {this.cliente = cliente;}

    public String getEndereco() {return endereco;}

    public void setEndereco(String endereco) {this.endereco = endereco;}

}
