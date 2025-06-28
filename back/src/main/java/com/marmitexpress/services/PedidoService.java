package com.marmitexpress.services;

import com.marmitexpress.dto.*;
import com.marmitexpress.exceptions.PedidoNotFoundException;
import com.marmitexpress.models.*;
import com.marmitexpress.repositorys.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private RestauranteRepository restauranteRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private IngredienteRepository ingredienteRepository;
    
    @Autowired
    private DetalhePedidoRepository detalhePedidoRepository;

    public Pedido criarPedido(PedidoDTO pedidoDTO, Cliente cliente) {
        var restauranteOpt = restauranteRepository.findById(pedidoDTO.getRestauranteId());
        if (restauranteOpt.isEmpty()) {
            throw new RuntimeException("Restaurante não encontrado");
        }
        if (!restauranteOpt.get().isAceitandoPedidos()) {
            throw new RuntimeException("Restaurante não está aceitando pedidos no momento");
        }

        for (ItemPedidoDTO itemPedidoDTO: pedidoDTO.getItens()){
            Item baseItem = itemRepository.findById(itemPedidoDTO.getItemId())
            .orElseThrow(() -> new RuntimeException("Item não encontrado para o ID: " + itemPedidoDTO.getItemId()));

            for (ItemIngrediente itemIng : baseItem.getIngredientes()){
                Ingrediente ingrediente = itemIng.getIngrediente();
                int quantidadeNecessaria = itemIng.getQuantidade() * itemPedidoDTO.getQuantidade();
                if (ingrediente.getQuantidade() < quantidadeNecessaria) {
                    throw new RuntimeException("Estoque insuficiente para o ingrediente: " + ingrediente.getNome());
                }
            }
        }

        for (ItemPedidoDTO itemDTO : pedidoDTO.getItens()){
            Item baseItem = itemRepository.findById(itemDTO.getItemId()).get();

            for (ItemIngrediente itemIng : baseItem.getIngredientes()){
                Ingrediente ingrediente = itemIng.getIngrediente();
                int quantidadeNecessaria = itemIng.getQuantidade() * itemDTO.getQuantidade();
                ingrediente.setQuantidade(ingrediente.getQuantidade() - quantidadeNecessaria);
                ingredienteRepository.save(ingrediente);
            }
        }

        Pedido pedido = new Pedido();
        pedido.setRestaurante(restauranteOpt.get());
        pedido.setCliente(cliente);
        pedido.setEndereco(pedidoDTO.getEndereco());
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setPreco(0);
    
        pedido = pedidoRepository.save(pedido);
    
        double total = 0;
        List<DetalhePedido> detalhePedidos = new ArrayList<>();
    
        for (ItemPedidoDTO itemDTO : pedidoDTO.getItens()) {
            DetalhePedido detalhe = new DetalhePedido();
            detalhe.setPedido(pedido);
            detalhe.setQuantidade(itemDTO.getQuantidade());
    
            if (itemDTO.getItemId() != null) {
                Item baseItem = itemRepository.findById(itemDTO.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item não encontrado para o ID: " + itemDTO.getItemId()));
    
                if (baseItem.getQuantidade() < itemDTO.getQuantidade()) {
                    throw new RuntimeException("Estoque insuficiente para o item: " + baseItem.getNome());
                }
    
                baseItem.setQuantidade(baseItem.getQuantidade() - itemDTO.getQuantidade());
    
                itemRepository.save(baseItem);
    
                detalhe.setItem(baseItem);
    
                if (itemDTO.getIngredientes() != null && !itemDTO.getIngredientes().isEmpty()) {
                    detalhe.setIngredientesPersonalizados(itemDTO.getIngredientes());
                }
    
                total += baseItem.getPreco() * detalhe.getQuantidade();
            }
    
            detalhePedidos.add(detalhe);
        }
    
        pedido.setItens(detalhePedidos);
        pedido.setPreco(total);
    
        detalhePedidoRepository.saveAll(detalhePedidos);
    
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> buscarPedidoPorId(Long id) {
        return pedidoRepository.findById(id);
    }

    public void deletarPedido(Long id) {
        if (!pedidoRepository.existsById(id)) {
            throw new PedidoNotFoundException();
        }
        pedidoRepository.deleteById(id);
    }

    public ResumoPedidoDTO gerarResumoPedido(Long pedidoId) {
    Pedido pedido = pedidoRepository.findById(pedidoId)
        .orElseThrow(() -> new RuntimeException("Pedido não encontrado para o ID: " + pedidoId));

    ResumoPedidoDTO resumo = new ResumoPedidoDTO();
    resumo.idPedido = pedido.getId();
    resumo.status = pedido.getStatus().toString();
    resumo.nomeCliente = pedido.getCliente().getNome();
    resumo.enderecoEntrega = pedido.getRestaurante().getEndereco();
    resumo.precoTotal = pedido.getPreco();

    resumo.itens = pedido.getItens().stream().map(detalhe -> {
        ResumoPedidoDTO.ItemResumo item = new ResumoPedidoDTO.ItemResumo();
        item.nomeItem = detalhe.getItem().getNome();
        item.quantidade = detalhe.getQuantidade();
        item.precoUnitario = detalhe.getItem().getPreco();
        item.subtotal = detalhe.getItem().getPreco() * detalhe.getQuantidade();
        // Preferir ingredientes personalizados, se existirem
        if (detalhe.getIngredientesPersonalizados() != null && !detalhe.getIngredientesPersonalizados().isEmpty()) {
            item.ingredientes = detalhe.getIngredientesPersonalizados();
        } else {
            item.ingredientes = detalhe.getItem().getIngredientes().stream()
                .map(itemIng -> itemIng.getIngrediente().getNome())
                .toList();
        }
        return item;
    }).toList();
        return resumo;
    }
}