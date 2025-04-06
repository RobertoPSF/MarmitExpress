package com.marmitexpress.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marmitexpress.models.DetalhePedido;

public interface DetalhePedidoRepository extends JpaRepository<DetalhePedido, Long> {
    List<DetalhePedido> findByPedidoId(Long pedidoId);
}