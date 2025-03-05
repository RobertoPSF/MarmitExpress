package com.marmitexpress.repositorys;

import com.marmitexpress.models.Item;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
