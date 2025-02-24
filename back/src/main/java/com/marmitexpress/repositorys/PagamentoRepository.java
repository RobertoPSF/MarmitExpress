package com.marmitexpress.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import com.marmitexpress.models.Pagamento;


public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    // Métodos customizados podem ser adicionados aqui
}
