package com.marmitexpress.repositorys;

import com.marmitexpress.models.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface IngredienteRepository extends JpaRepository<Ingrediente, UUID> {
    List<Ingrediente> findByRestauranteId(UUID restauranteId);
}
