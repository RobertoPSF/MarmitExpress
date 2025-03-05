package com.marmitexpress.services;

import com.marmitexpress.exceptions.ItemNotFoundException;
import com.marmitexpress.models.Item;
import com.marmitexpress.repositorys.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public Optional<Item> buscarItemPorId(UUID id) {
        return itemRepository.findById(id);
    }

    public void deletarItem(UUID id) {
        if (!itemRepository.existsById(id)) {
            throw new ItemNotFoundException();
        }
        itemRepository.deleteById(id);
    }

    public Item atualizarItem(UUID id, Item itemAtualizado) {
        Optional<Item> itemOpt = itemRepository.findById(id);
        if (itemOpt.isEmpty()) {
            throw new ItemNotFoundException();
        }

        Item itemExistente = itemOpt.get();

        if (itemAtualizado.getNome() != null) {
            itemExistente.setNome(itemAtualizado.getNome());
        }
        if (itemAtualizado.getPreco() != 0) {
            itemExistente.setPreco(itemAtualizado.getPreco());
        }
        if (itemAtualizado.getQuantidade() != 0) {
            itemExistente.setQuantidade(itemAtualizado.getQuantidade());
        }
        if (itemAtualizado.getRestaurante() != null) {
            itemExistente.setRestaurante(itemAtualizado.getRestaurante());
        }

        return itemRepository.save(itemExistente);
    }
}
