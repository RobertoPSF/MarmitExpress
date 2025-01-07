package com.marmitexpress.services;

import com.marmitexpress.models.Pedido;
import com.marmitexpress.repositorys.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    // Criar um novo pedido (RF-06)
    public Pedido criarPedido(Pedido pedido) {
        // Define a data do pedido como o momento atual
        pedido.setDataPedido(LocalDateTime.now());
        // Define o status inicial como "Pendente"
        pedido.setStatus("Pendente");
        // Calcula o valor total do pedido
        pedido.setValorTotal(pedido.getMarmita().getPreco() * pedido.getQuantidade());
        return pedidoRepository.save(pedido);
    }

    // Listar todos os pedidos (RF-07)
    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    // Buscar um pedido por ID
    public Pedido buscarPedidoPorId(Long id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    // Buscar pedidos por usuário (RF-07)
    public List<Pedido> buscarPedidosPorUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioId(usuarioId);
    }

    // Atualizar o status de um pedido (RF-08)
    public Pedido atualizarStatusPedido(Long id, String status) {
        Pedido pedido = pedidoRepository.findById(id).orElse(null);
        if (pedido != null) {
            pedido.setStatus(status);
            return pedidoRepository.save(pedido);
        }
        return null;
    }

    // Cancelar um pedido (RF-08)
    public void cancelarPedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id).orElse(null);
        if (pedido != null) {
            pedido.setStatus("Cancelado");
            pedidoRepository.save(pedido);
        }
    }

    // Comprar marmita (RF-09)
    public Pedido comprarMarmita(Pedido pedido) {
        return criarPedido(pedido); // Reutiliza o método de criação de pedido
    }
}