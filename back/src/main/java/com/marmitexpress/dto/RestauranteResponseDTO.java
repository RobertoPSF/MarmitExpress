package com.marmitexpress.dto;

import java.util.List;
import java.util.UUID;

import com.marmitexpress.models.Ingrediente;
import com.marmitexpress.models.Item;
import com.marmitexpress.models.Marmita;
import com.marmitexpress.models.Pedido;

public record RestauranteResponseDTO(
    UUID id,
    String nome,
    String nomeProprietario,
    String email,
    String endereco,
    String telefone,
    String descricao,
    boolean aceitandoPedidos,
    String chavePix,
    List<Ingrediente> ingredientes,
    List<Item> listaDeItems,
    List<Marmita> marmitas,
    List<Pedido> listaDePedidos
) {}
