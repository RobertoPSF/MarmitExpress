package com.marmitexpress.services;

import com.marmitexpress.exceptions.PedidoNotFoundException;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.repositorys.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido criarPedido(Pedido pedido) {
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
