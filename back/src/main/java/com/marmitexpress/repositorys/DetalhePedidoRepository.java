package com.marmitexpress.repositorys;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marmitexpress.models.DetalhePedido;

public interface DetalhePedidoRepository extends JpaRepository<DetalhePedido, UUID> {
    List<DetalhePedido> findByPedidoId(UUID pedidoId);
}