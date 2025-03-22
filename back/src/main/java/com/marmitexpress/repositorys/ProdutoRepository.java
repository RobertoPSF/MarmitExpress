package com.marmitexpress.repositorys;

import com.marmitexpress.models.Produto;
import com.marmitexpress.models.Restaurante;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, UUID> {
    List<Produto> findByRestaurante(Restaurante restaurante);
}
