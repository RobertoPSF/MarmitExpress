package com.marmitexpress.repositorys;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.marmitexpress.models.Pagamento;


public interface PagamentoRepository extends JpaRepository<Pagamento, UUID> {
    // Métodos customizados podem ser adicionados aqui
}
