package com.marmitexpress.services;

import com.marmitexpress.models.Restaurante;
import com.marmitexpress.repositorys.RestauranteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RestauranteServiceTest {

    @Mock
    private RestauranteRepository restauranteRepository;

    @InjectMocks
    private RestauranteService restauranteService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarRestaurante() {
        // Arrange
        Restaurante restaurante = new Restaurante();
        restaurante.setNome("Restaurante Teste");
        restaurante.setEndereco("Rua Teste, 123");
        restaurante.setTelefone("123456789");

        when(restauranteRepository.save(restaurante)).thenReturn(restaurante);

        // Act
        Restaurante resultado = restauranteService.criarRestaurante(restaurante);

        // Assert
        assertNotNull(resultado);
        assertEquals("Restaurante Teste", resultado.getNome());
        verify(restauranteRepository, times(1)).save(restaurante);
    }

    @Test
    public void testListarRestaurantes() {
        // Arrange
        Restaurante restaurante1 = new Restaurante();
        restaurante1.setNome("Restaurante 1");

        Restaurante restaurante2 = new Restaurante();
        restaurante2.setNome("Restaurante 2");

        when(restauranteRepository.findAll()).thenReturn(Arrays.asList(restaurante1, restaurante2));

        // Act
        List<Restaurante> resultado = restauranteService.listarRestaurantes();

        // Assert
        assertEquals(2, resultado.size());
        verify(restauranteRepository, times(1)).findAll();
    }

    @Test
    public void testBuscarRestaurantePorId() {
        // Arrange
        Restaurante restaurante = new Restaurante();
        restaurante.setId(1L);
        restaurante.setNome("Restaurante Teste");

        when(restauranteRepository.findById(1L)).thenReturn(Optional.of(restaurante));

        // Act
        Optional<Restaurante> resultado = restauranteService.buscarRestaurantePorId(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("Restaurante Teste", resultado.get().getNome());
        verify(restauranteRepository, times(1)).findById(1L);
    }

    @Test
    public void testAtualizarRestaurante() {
        // Arrange
        Restaurante restauranteExistente = new Restaurante();
        restauranteExistente.setId(1L);
        restauranteExistente.setNome("Restaurante Antigo");

        Restaurante restauranteAtualizado = new Restaurante();
        restauranteAtualizado.setNome("Restaurante Atualizado");

        when(restauranteRepository.findById(1L)).thenReturn(Optional.of(restauranteExistente));
        when(restauranteRepository.save(restauranteExistente)).thenReturn(restauranteExistente);

        // Act
        Restaurante resultado = restauranteService.atualizarRestaurante(1L, restauranteAtualizado);

        // Assert
        assertNotNull(resultado);
        assertEquals("Restaurante Atualizado", resultado.getNome());
        verify(restauranteRepository, times(1)).findById(1L);
        verify(restauranteRepository, times(1)).save(restauranteExistente);
    }

    @Test
    public void testDeletarRestaurante() {
        // Arrange
        doNothing().when(restauranteRepository).deleteById(1L);

        // Act
        restauranteService.deletarRestaurante(1L);

        // Assert
        verify(restauranteRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testBuscarRestaurantesPorNome(){
        // Arrange
        Restaurante restaurante1 = new Restaurante();
        restaurante1.setNome("Restaurante 1");
 
        Restaurante restaurante2 = new Restaurante();
        restaurante2.setNome("Restaurante 2");
 
        when(restauranteRepository.findByNomeContainingIgnoreCase("Restaurante")).thenReturn(Arrays.asList(restaurante1, restaurante2));
 
        // Act
        List<Restaurante> resultado = restauranteService.buscarRestaurantesPorNome("Restaurante");
 
        // Assert
        assertEquals(2, resultado.size());
        verify(restauranteRepository, times(1)).findByNomeContainingIgnoreCase("Restaurante");
    }
}