package com.marmitexpress.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference("restaurante-pedido")
    private Restaurante restaurante;

    private double preco;

    @ManyToOne
    @JsonBackReference("cliente-pedido")
    private Cliente cliente;

    private String endereco;

    @Enumerated(EnumType.STRING)
    private StatusPedido status = StatusPedido.PENDENTE; // Começa como PENDENTE

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("pedido-detalhe")
    private List<DetalhePedido> itens; // Relacionamento com DetalhePedido
}
