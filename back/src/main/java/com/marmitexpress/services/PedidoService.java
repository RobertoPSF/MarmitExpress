package com.marmitexpress.services;

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
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private RestauranteRepository restauranteRepository;
    @Autowired
    private ItemRepository ItemRepository;
    @Autowired
    private DetalhePedidoRepository detalhePedidoRepository;

    public Pedido criarPedido(PedidoDTO pedidoRequestDTO, Cliente cliente) {
        var restauranteOpt = restauranteRepository.findById(pedidoRequestDTO.getRestauranteId());
        if (restauranteOpt.isEmpty()) {
            throw new RuntimeException("Restaurante não encontrado");
        }
        if (!restauranteOpt.get().isAceitandoPedidos()) {
            throw new RuntimeException("Restaurante não está aceitando pedidos no momento");
        }
    
        Map<UUID, Integer> itensQuantidades = pedidoRequestDTO.getItensQuantidades();
        List<Item> Items = ItemRepository.findAllById(new ArrayList<>(itensQuantidades.keySet()));
    
        if (Items.isEmpty()) {
            throw new RuntimeException("Nenhum Item encontrado");
        }
    
        for (Item Item : Items) {
            Integer quantidadeSolicitada = itensQuantidades.get(Item.getId());
            if (quantidadeSolicitada > Item.getQuantidade()) {
                throw new RuntimeException("Quantidade solicitada para o Item " + Item.getNome() + " excede o estoque disponível.");
            }
        }
    
        // ✅ Primeiro, cria e salva o Pedido no banco
        Pedido pedido = new Pedido();
        pedido.setRestaurante(restauranteOpt.get());
        pedido.setCliente(cliente);
        pedido.setEndereco(pedidoRequestDTO.getEndereco());
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setPreco(0); // Definido inicialmente como 0
    
        pedido = pedidoRepository.save(pedido); // 🔥 Agora, o Pedido já tem um ID
    
        double total = 0;
        List<DetalhePedido> detalhePedidos = new ArrayList<>();
    
        for (Item Item : Items) {
            Integer quantidadeSolicitada = itensQuantidades.get(Item.getId());
            DetalhePedido detalhePedido = new DetalhePedido(null, pedido, Item, quantidadeSolicitada);
            detalhePedidos.add(detalhePedido);
            total += Item.getPreco() * quantidadeSolicitada;
        }
    
        // Agora que temos os detalhes do pedido, podemos associá-los ao Pedido
        pedido.setItens(detalhePedidos);
    
        // ✅ Salvar os detalhes do pedido
        detalhePedidoRepository.saveAll(detalhePedidos); 
    
        // ✅ Atualizar o preço e salvar o pedido novamente
        pedido.setPreco(total);
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