package com.marmitexpress.services;

import com.marmitexpress.dto.PedidoRequestDTO;
import com.marmitexpress.exceptions.PedidoNotFoundException;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.models.DetalhePedido;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Produto;
import com.marmitexpress.models.StatusPedido;
import com.marmitexpress.repositorys.DetalhePedidoRepository;
import com.marmitexpress.repositorys.PedidoRepository;
import com.marmitexpress.repositorys.ProdutoRepository;
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
    private ProdutoRepository produtoRepository;
    @Autowired
    private DetalhePedidoRepository detalhePedidoRepository;

    public Pedido criarPedido(PedidoRequestDTO pedidoRequestDTO, Cliente cliente) {
        var restauranteOpt = restauranteRepository.findById(pedidoRequestDTO.getRestauranteId());
        if (restauranteOpt.isEmpty()) {
            throw new RuntimeException("Restaurante não encontrado");
        }
        if (!restauranteOpt.get().isAceitandoPedidos()) {
            throw new RuntimeException("Restaurante não está aceitando pedidos no momento");
        }

        Map<UUID, Integer> itensQuantidades = pedidoRequestDTO.getItensQuantidades();
        List<Produto> produtos = produtoRepository.findAllById(new ArrayList<>(itensQuantidades.keySet()));

        if (produtos.isEmpty()) {
            throw new RuntimeException("Nenhum produto encontrado");
        }

        for (Produto produto : produtos) {
            Integer quantidadeSolicitada = itensQuantidades.get(produto.getId());
            if (quantidadeSolicitada > produto.getQuantidade()) {
                throw new RuntimeException("Quantidade solicitada para o produto " + produto.getNome() + " excede o estoque disponível.");
            }
        }

        Pedido pedido = new Pedido();
        pedido.setRestaurante(restauranteOpt.get());
        pedido.setCliente(cliente);
        pedido.setEndereco(pedidoRequestDTO.getEndereco());
        pedido.setStatus(StatusPedido.PENDENTE);

        double total = 0;
        List<DetalhePedido> detalhePedidos = new ArrayList<>();
        for (Produto produto : produtos) {
            Integer quantidadeSolicitada = itensQuantidades.get(produto.getId());
            DetalhePedido detalhePedido = new DetalhePedido(null, pedido, produto, quantidadeSolicitada);

            detalhePedidoRepository.save(detalhePedido);
            detalhePedidos.add(detalhePedido);
            total += produto.getPreco() * quantidadeSolicitada; // Corrigido para usar a quantidade solicitada
        }

        pedido.setPreco(total);
        pedido.setItens(detalhePedidos);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> buscarPedidoPorId(UUID id) {
        return pedidoRepository.findById(id);
    }

    public void deletarPedido(UUID id) {
        if (!pedidoRepository.existsById(id)) {
            throw new PedidoNotFoundException();
        }
        pedidoRepository.deleteById(id);
    }
}