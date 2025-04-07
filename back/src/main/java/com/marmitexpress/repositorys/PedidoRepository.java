package com.marmitexpress.repositorys;

import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.models.Cliente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByCliente(Cliente cliente);
    
    List<Pedido> findByRestaurante(Restaurante restaurante);
}
