package com.marmitexpress.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "UUID", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    private Pedido pedido;

    @ManyToOne
    private Item item; // Pode ser Marmita ou qualquer outro item

    private int quantidade; // Quantidade do item no pedido
}
