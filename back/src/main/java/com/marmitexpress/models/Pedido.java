package com.marmitexpress.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    @Enumerated(EnumType.STRING)
    private StatusPedido status = StatusPedido.PENDENTE; // Começa como PENDENTE

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<PedidoItem> itens; // Relacionamento com PedidoItem
}

