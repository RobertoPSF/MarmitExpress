package com.marmitexpress.repositorys;

import com.marmitexpress.models.Item;
import com.marmitexpress.models.Restaurante;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findByRestaurante(Restaurante restaurante);
}
