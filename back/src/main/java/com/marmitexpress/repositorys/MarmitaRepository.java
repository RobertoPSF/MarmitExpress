package com.marmitexpress.repositorys;

import com.marmitexpress.models.Marmita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarmitaRepository extends JpaRepository<Marmita, Long> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}