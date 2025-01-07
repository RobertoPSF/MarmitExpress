package com.marmitexpress.repositorys;

import com.marmitexpress.models.Marmita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarmitaRepository extends JpaRepository<Marmita, Long> {

    // Buscar marmitas por restaurante
    List<Marmita> findByRestauranteId(Long restauranteId);
}