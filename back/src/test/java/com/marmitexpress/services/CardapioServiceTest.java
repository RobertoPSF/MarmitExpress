package com.marmitexpress.services;

import com.marmitexpress.models.Cardapio;
import com.marmitexpress.repositorys.CardapioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CardapioServiceTest {

    @InjectMocks
    private CardapioService cardapioService;

    @Mock
    private CardapioRepository cardapioRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarCardapio() {
        Cardapio cardapio = new Cardapio();
        cardapio.setNome("Cardápio Teste");

        when(cardapioRepository.save(cardapio)).thenReturn(cardapio);

        Cardapio resultado = cardapioService.criarCardapio(cardapio);
        assertEquals("Cardápio Teste", resultado.getNome());
        verify(cardapioRepository, times(1)).save(cardapio);
    }

    @Test
    public void testListarCardapios() {
        List<Cardapio> cardapios = new ArrayList<>();
        cardapios.add(new Cardapio());
        when(cardapioRepository.findAll()).thenReturn(cardapios);

        List<Cardapio> resultado = cardapioService.listarCardapios();
        assertEquals(1, resultado.size());
        verify(cardapioRepository, times(1)).findAll();
    }

    @Test
    public void testBuscarCardapioPorId() {
        Cardapio cardapio = new Cardapio();
        when(cardapioRepository.findById(1L)).thenReturn(Optional.of(cardapio));

        Cardapio resultado = cardapioService.buscarCardapioPorId(1L);
        assertNotNull(resultado);
        verify(cardapioRepository, times(1)).findById(1L);
    }

    @Test
    public void testAtualizarCardapio() {
        Cardapio cardapioExistente = new Cardapio();
        cardapioExistente.setId(1L);
        cardapioExistente.setNome("Cardápio Antigo");

        when(cardapioRepository.existsById(1L)).thenReturn(true);
        when(cardapioRepository.save(cardapioExistente)).thenReturn(cardapioExistente);

        Cardapio resultado = cardapioService.atualizarCardapio(1L, cardapioExistente);
        assertEquals("Cardápio Antigo", resultado.getNome());
        verify(cardapioRepository, times(1)).save(cardapioExistente);
    }

    @Test
    public void testDeletarCardapio() {
        cardapioService.deletarCardapio(1L);
        verify(cardapioRepository, times(1)).deleteById(1L);
    }
}