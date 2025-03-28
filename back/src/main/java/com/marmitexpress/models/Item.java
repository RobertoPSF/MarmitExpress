package com.marmitexpress.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED) // Para herança entre Item e Marmita
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;

    private String nome;
    private double preco;
    private int quantidade;
    private byte[] foto;

    @ManyToOne

    @JsonIgnore
    private Restaurante restaurante;
}
