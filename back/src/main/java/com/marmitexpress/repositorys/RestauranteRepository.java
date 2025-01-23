package com.marmitexpress.repositorys;

import com.marmitexpress.models.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
