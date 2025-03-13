package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

import com.marmitexpress.models.Ingrediente;
import com.marmitexpress.models.Item;
import com.marmitexpress.models.Marmita;

public record RestauranteResponseDTO(
    UUID id,
    String nome,
    String email,
    String endereco,
    String telefone,
    String descricao,
    boolean aceitandoPedidos,
    String chavePix,
    List<Ingrediente> ingredientes,
    List<Item> listaDeItens,
    List<Marmita> marmitas
) {}
