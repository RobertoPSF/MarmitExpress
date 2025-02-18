package com.marmitexpress.repositorys;

import com.marmitexpress.models.Restaurante;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {

    Optional<Restaurante> findByUsuario(String usuario);
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
