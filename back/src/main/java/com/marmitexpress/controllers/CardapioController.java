package com.marmitexpress.controllers;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.marmitexpress.dto.CardapioDTO;
import com.marmitexpress.models.Cardapio;
import com.marmitexpress.services.CardapioService;

@RestController
@RequestMapping("/cardapios")
public class CardapioController {

    @Autowired
    private CardapioService cardapioService;

    // Criar um novo cardápio
    @PostMapping
    public ResponseEntity<CardapioDTO> criarCardapio(@RequestBody CardapioDTO cardapioDTO) {
        Cardapio cardapio = new Cardapio();
        cardapio.setNome(cardapioDTO.getNome());
        // Lógica para associar marmitas
        // cardapio.setMarmitas(marmitaService.findByIds(cardapioDTO.getMarmitasIds()));

        Cardapio novoCardapio = cardapioService.criarCardapio(cardapio);
        return new ResponseEntity<>(convertToDTO(novoCardapio), HttpStatus.CREATED);
    }

    // Método para listar todos os cardápios
    @GetMapping
    public ResponseEntity<List<CardapioDTO>> listarCardapios() {
        List<Cardapio> cardapios = cardapioService.listarCardapios();
        List<CardapioDTO> cardapioDTOs = cardapios.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(cardapioDTOs, HttpStatus.OK);
    }

    // Buscar um cardápio por ID
    @GetMapping("/{id}")
    public ResponseEntity<CardapioDTO> buscarCardapioPorId(@PathVariable Long id) {
        Cardapio cardapio = cardapioService.buscarCardapioPorId(id);
        if (cardapio != null) {
            return new ResponseEntity<>(convertToDTO(cardapio), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Atualizar um cardápio
    @PutMapping("/{id}")
    public ResponseEntity<CardapioDTO> atualizarCardapio(@PathVariable Long id, @RequestBody CardapioDTO cardapioDTO) {
        Cardapio cardapio = new Cardapio();
        cardapio.setNome(cardapioDTO.getNome());
        Cardapio cardapioAtualizado = cardapioService.atualizarCardapio(id, cardapio);
        if (cardapioAtualizado != null) {
            return new ResponseEntity<>(convertToDTO(cardapioAtualizado), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Deletar um cardápio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCardapio(@PathVariable Long id) {
        cardapioService.deletarCardapio(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Método para converter Cardapio para CardapioDTO
    private CardapioDTO convertToDTO(Cardapio cardapio) {
        CardapioDTO dto = new CardapioDTO();
        dto.setNome(cardapio.getNome());
        // Adicione outras propriedades conforme necessário
        return dto;
    }
}
