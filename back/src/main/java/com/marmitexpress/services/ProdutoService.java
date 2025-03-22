package com.marmitexpress.services;

import com.marmitexpress.exceptions.ItemNotFoundException;
import com.marmitexpress.models.Produto;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.repositorys.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository itemRepository;

    public Produto criarItem(Produto item) {
        return itemRepository.save(item);
    }

    public List<Produto> listarItens() {
        return itemRepository.findAll();
    }

    public Optional<Produto> buscarItemPorId(UUID id) {
        return itemRepository.findById(id);
    }

    public void deletarItem(UUID id) {
        if (!itemRepository.existsById(id)) {
            throw new ItemNotFoundException();
        }
        itemRepository.deleteById(id);
    }

    public Produto atualizarItem(UUID id, Produto itemAtualizado) {
        Optional<Produto> itemOpt = itemRepository.findById(id);
        if (itemOpt.isEmpty()) {
            throw new ItemNotFoundException();
        }

        Produto itemExistente = itemOpt.get();

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

    public List<Produto> buscarItensPorRestaurante(Restaurante restaurante) {
        return itemRepository.findByRestaurante(restaurante);
    }

}
