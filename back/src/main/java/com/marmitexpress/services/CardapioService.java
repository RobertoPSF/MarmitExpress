package com.marmitexpress.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marmitexpress.models.Cardapio;
import com.marmitexpress.repositorys.CardapioRepository;

import java.util.List;

@Service
public class CardapioService {

    @Autowired
    private CardapioRepository cardapioRepository;

    public Cardapio criarCardapio(Cardapio cardapio) {
        return cardapioRepository.save(cardapio);
    }

    public List<Cardapio> listarCardapios() {
        return cardapioRepository.findAll();
    }

    public Cardapio buscarCardapioPorId(Long id) {
        return cardapioRepository.findById(id).orElse(null);
    }

    public Cardapio atualizarCardapio(Long id, Cardapio cardapio) {
        if (cardapioRepository.existsById(id)) {
            cardapio.setId(id);
            return cardapioRepository.save(cardapio);
        }
        return null;
    }

    public void deletarCardapio(Long id) {
        cardapioRepository.deleteById(id);
    }
}
