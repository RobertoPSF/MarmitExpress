package com.marmitexpress.repositorys;

import com.marmitexpress.models.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
