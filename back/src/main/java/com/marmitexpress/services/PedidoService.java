package com.marmitexpress.services;

import com.marmitexpress.dto.ItemPedidoDTO;
import com.marmitexpress.dto.PedidoDTO;
import com.marmitexpress.exceptions.PedidoNotFoundException;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.models.DetalhePedido;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Item;
import com.marmitexpress.models.StatusPedido;
import com.marmitexpress.repositorys.DetalhePedidoRepository;
import com.marmitexpress.repositorys.PedidoRepository;
import com.marmitexpress.repositorys.ItemRepository;
import com.marmitexpress.repositorys.RestauranteRepository;

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
    private DetalhePedidoRepository detalhePedidoRepository;

    public Pedido criarPedido(PedidoDTO pedidoDTO, Cliente cliente) {
        var restauranteOpt = restauranteRepository.findById(pedidoDTO.getRestauranteId());
        if (restauranteOpt.isEmpty()) {
            throw new RuntimeException("Restaurante não encontrado");
        }
        if (!restauranteOpt.get().isAceitandoPedidos()) {
            throw new RuntimeException("Restaurante não está aceitando pedidos no momento");
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
}