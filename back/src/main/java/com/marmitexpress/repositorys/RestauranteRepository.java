package com.marmitexpress.repositorys;

import com.marmitexpress.models.Restaurante;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestauranteRepository extends JpaRepository<Restaurante, UUID> {
    Optional<Restaurante> findByEmail(String email);
}
