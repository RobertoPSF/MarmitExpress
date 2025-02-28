package com.marmitexpress.repositorys;

import com.marmitexpress.models.Ingrediente;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredienteRepository extends JpaRepository<Ingrediente, UUID> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
