package com.marmitexpress.repositorys;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marmitexpress.models.PedidoItem;

public interface PedidoItemRepository extends JpaRepository<PedidoItem, UUID> {
    List<PedidoItem> findByPedidoId(UUID pedidoId);
}