package com.marmitexpress.services;

import com.marmitexpress.exceptions.ItemNotFoundException;
import com.marmitexpress.models.Item;
import com.marmitexpress.repositorys.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public Item criarItem(Item item) {
        return itemRepository.save(item);
    }

    public List<Item> listarItens() {
        return itemRepository.findAll();
    }

    public Optional<Item> buscarItemPorId(Long id) {
        return itemRepository.findById(id);
    }

    public void deletarItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ItemNotFoundException();
        }
        itemRepository.deleteById(id);
    }
}
