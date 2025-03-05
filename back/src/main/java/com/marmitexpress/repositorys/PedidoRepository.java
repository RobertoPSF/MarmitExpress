package com.marmitexpress.repositorys;

import com.marmitexpress.models.Pedido;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, UUID> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
