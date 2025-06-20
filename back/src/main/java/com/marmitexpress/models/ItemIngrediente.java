package com.marmitexpress.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemIngrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Item item;

    @ManyToOne
    private Ingrediente ingrediente;

    @Column(nullable = false)
    private Integer quantidade; // quantia usada do ingrediente em cada item
}
