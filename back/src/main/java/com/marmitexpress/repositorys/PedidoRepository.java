package com.marmitexpress.repositorys;

import com.marmitexpress.models.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // Buscar pedidos por usuário
    List<Pedido> findByUsuarioId(Long usuarioId);

    // Buscar pedidos por status
    List<Pedido> findByStatus(String status);
}