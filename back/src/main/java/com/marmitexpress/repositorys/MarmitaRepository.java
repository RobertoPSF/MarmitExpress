package com.marmitexpress.repositorys;

import com.marmitexpress.models.Marmita;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MarmitaRepository extends JpaRepository<Marmita, UUID> {
    List<Marmita> findByRestauranteId(UUID restauranteId);
}
