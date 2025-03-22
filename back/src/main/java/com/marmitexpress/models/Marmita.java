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
public class Marmita extends Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Gera um UUID automaticamente
    private UUID id;

    @ManyToMany
    @JoinTable(
        name = "marmita_ingredientes", // Nome da tabela de relação (evita conflito com a tabela "marmita")
        joinColumns = @JoinColumn(name = "marmita_id"),
        inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )
    private List<Ingrediente> ingredientes;
}