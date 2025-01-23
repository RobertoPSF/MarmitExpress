package com.marmitexpress.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID gerado automaticamente
    private String tipo; // "marmita" ou "outros"
    private double preco;
    private int quantidade;
    private byte[] foto; // Armazenar a foto como um array de bytes

    @ManyToOne
    private Restaurante restaurante; // Many items can belong to one restaurant

    @OneToOne
    private Marmita marmita; // Pode ser nula se não for uma marmita

    public Item(String tipo, double preco, int quantidade, byte[] foto, Restaurante restaurante, Marmita marmita) {
        this.tipo = tipo;
        this.preco = preco;
        this.quantidade = quantidade;
        this.foto = foto;
        this.restaurante = restaurante;
        this.marmita = marmita;
    }

    public Long getId() {
        return id;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public double getPreco() {
        return preco;
    }
    public void setPreco(double preco) {
        this.preco = preco;
    }
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    public byte[] getFoto() {
        return foto;
    }
    public void setFoto(byte[] foto) {
        this.foto = foto;
    }
    public Restaurante getRestaurante() {
        return restaurante;
    }
    public void setRestaurante(Restaurante restaurante) {
        this.restaurante = restaurante;
    }
    public Marmita getMarmita() {
        return marmita;
    }
    public void setMarmita(Marmita marmita) {
        this.marmita = marmita;
    }
}
