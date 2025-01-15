package com.marmitexpress.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.marmitexpress.dto.CardapioDTO;
import com.marmitexpress.models.Cardapio;
import com.marmitexpress.services.CardapioService;

public class CardapioControllerTest {

    @InjectMocks
    private CardapioController cardapioController;

    @Mock
    private CardapioService cardapioService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarCardapio() {
        CardapioDTO cardapioDTO = new CardapioDTO();
        cardapioDTO.setNome("Cardápio Teste");

        Cardapio cardapio = new Cardapio();
        cardapio.setNome("Cardápio Teste");

        when(cardapioService.criarCardapio(any(Cardapio.class))).thenReturn(cardapio);

        ResponseEntity<CardapioDTO> response = cardapioController.criarCardapio(cardapioDTO);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Cardápio Teste", response.getBody().getNome());
    }

    @Test
    public void testListarCardapios() {
        List<Cardapio> cardapios = new ArrayList<>();
        Cardapio cardapio = new Cardapio();
        cardapio.setNome("Cardápio Teste");
        cardapios.add(cardapio);
    
        when(cardapioService.listarCardapios()).thenReturn(cardapios);
    
        ResponseEntity<List<CardapioDTO>> response = cardapioController.listarCardapios();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals("Cardápio Teste", response.getBody().get(0).getNome());
    }
    
    @Test
    public void testBuscarCardapioPorId() {
        Cardapio cardapio = new Cardapio();
        cardapio.setNome("Cardápio Teste");

        when(cardapioService.buscarCardapioPorId(1L)).thenReturn(cardapio);

        ResponseEntity<CardapioDTO> response = cardapioController.buscarCardapioPorId(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Cardápio Teste", response.getBody().getNome());
    }

    @Test
    public void testAtualizarCardapio() {
        CardapioDTO cardapioDTO = new CardapioDTO();
        cardapioDTO.setNome("Cardápio Atualizado");

        Cardapio cardapio = new Cardapio();
        cardapio.setNome("Cardápio Atualizado");

        when(cardapioService.atualizarCardapio(anyLong(), any(Cardapio.class))).thenReturn(cardapio);

        ResponseEntity<CardapioDTO> response = cardapioController.atualizarCardapio(1L, cardapioDTO);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Cardápio Atualizado", response.getBody().getNome());
    }

    @Test
    public void testDeletarCardapio() {
        ResponseEntity<Void> response = cardapioController.deletarCardapio(1L);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(cardapioService, times(1)).deletarCardapio(1L);
    }
}