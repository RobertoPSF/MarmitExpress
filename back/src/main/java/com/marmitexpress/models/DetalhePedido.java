package com.marmitexpress.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne
    private Item item; // Pode ser Marmita ou qualquer outro item

    private int quantidade; // Quantidade do item no pedido
}
