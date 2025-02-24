package com.marmitexpress.services;

import com.marmitexpress.exceptions.RestauranteNotFoundException;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.repositorys.RestauranteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.ArgumentMatchers.any;

public class RestauranteServiceTest {

    @InjectMocks
    private RestauranteService restauranteService;

    @Mock
    private RestauranteRepository restauranteRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarRestaurante() {
        Restaurante restaurante = new Restaurante("Restaurante Teste", "usuario@teste.com", "senha");
        restaurante.setDescricao("Descricao");

        when(restauranteRepository.save(restaurante)).thenReturn(restaurante);

        Restaurante restauranteCriado = restauranteService.criarRestaurante(restaurante);
        assertNotNull(restauranteCriado);
        assertEquals("Restaurante Teste", restauranteCriado.getNome());
    }

    @Test
    public void testListarRestaurantes() {
        List<Restaurante> restaurantes = new ArrayList<>();
        Restaurante restaurante = new Restaurante("Restaurante Teste", "usuario@teste.com", "senha");
        restaurante.setDescricao("Descricao");
        restaurantes.add(restaurante);

        when(restauranteRepository.findAll()).thenReturn(restaurantes);

        List<Restaurante> resultado = restauranteService.listarRestaurantes();
        assertEquals(1, resultado.size());
    }

    @Test
    public void testBuscarRestaurantePorId() {
        Restaurante restaurante = new Restaurante("Restaurante Teste", "usuario@teste.com", "senha");
        restaurante.setDescricao("Descricao");
        restaurante.setId(1L);
        
        when(restauranteRepository.findById(1L)).thenReturn(Optional.of(restaurante));

        Optional<Restaurante> resultado = restauranteService.buscarRestaurantePorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals(1L, resultado.get().getId());
    }

    @Test
    public void testAtualizarRestaurante() {
        Restaurante restauranteExistente = new Restaurante("Restaurante Teste", "usuario@teste.com", "senha");
        restauranteExistente.setDescricao("Descricao");
        restauranteExistente.setId(1L);

        when(restauranteRepository.findById(1L)).thenReturn(Optional.of(restauranteExistente));
        when(restauranteRepository.save(any(Restaurante.class))).thenReturn(restauranteExistente);

        Restaurante restauranteAtualizado = new Restaurante("Restaurante Atualizado", "usuario@teste.com", "senha");
        restauranteAtualizado.setDescricao("Nova Descricao");

        Restaurante resultado = restauranteService.atualizarRestaurante(1L, restauranteAtualizado);
        assertNotNull(resultado);
        assertEquals("Restaurante Atualizado", resultado.getNome());
    }

    @Test
    public void testDeletarRestaurante() {
        Restaurante restaurante = new Restaurante("Restaurante Teste", "usuario@teste.com", "senha");
        restaurante.setId(1L);
        
        when(restauranteRepository.existsById(1L)).thenReturn(true);
        doNothing().when(restauranteRepository).deleteById(1L);
        
        restauranteService.deletarRestaurante(1L);
        
        verify(restauranteRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testRegistrarAvaliacao() {
        Restaurante restaurante = new Restaurante("Restaurante Teste", "usuario@teste.com", "senha");
        restaurante.setId(1L);
        
        when(restauranteRepository.findById(1L)).thenReturn(Optional.of(restaurante));
        
        String resultado = restauranteService.registrarAvaliacao(1L, 4.5);
        assertEquals("Avaliação registrada com sucesso", resultado);
        assertEquals(4.5, restaurante.getAvaliacao());
    }

    @Test
    public void testRegistrarAvaliacaoRestauranteNaoEncontrado() {
        when(restauranteRepository.findById(1L)).thenReturn(Optional.empty());
        
        assertThrows(RestauranteNotFoundException.class, () -> {
            restauranteService.registrarAvaliacao(1L, 4.5);
        });
    }
}
