package com.marmitexpress.repositorys;

import com.marmitexpress.models.Marmita;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MarmitaRepository extends JpaRepository<Marmita, UUID> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
