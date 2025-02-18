package com.marmitexpress.repositorys;

import com.marmitexpress.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
