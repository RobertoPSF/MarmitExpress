package com.marmitexpress.dto;

import java.util.*;
import lombok.*;

@Getter
@Setter
public class ItemDTO {
    private String nome;
    private Double preco;
    private Integer quantidade;
    private UUID restauranteId;
    private List<ItemIngredienteDTO> ingredientes;
    public ItemDTO() {}

    public ItemDTO(String nome, Double preco, Integer quantidade, UUID restauranteId) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.restauranteId = restauranteId;
    }

}
