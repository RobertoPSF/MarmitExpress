package com.marmitexpress.repositorys;

import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Cliente;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, UUID> {

    List<Pedido> findByCliente(Cliente cliente);
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
