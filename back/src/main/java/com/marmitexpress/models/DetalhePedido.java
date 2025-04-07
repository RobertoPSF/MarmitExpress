package com.marmitexpress.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetalhePedido {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JsonBackReference("pedido-detalhe")
    private Pedido pedido;

    // Referência ao item base (pode ser Marmita, mas não será alterado)
    @ManyToOne
    private Item item;

    private int quantidade; // Quantidade do item no pedido

    // Ingredientes customizados, armazenados como lista de strings (por simplicidade)
    @ElementCollection
    private List<String> ingredientesPersonalizados;
}
