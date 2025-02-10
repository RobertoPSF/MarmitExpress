package com.marmitexpress.controllers;

import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.RestauranteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RestauranteControllerTest {

    @InjectMocks
    private RestauranteController restauranteController;

    @Mock
    private RestauranteService restauranteService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarRestaurante() {
        Restaurante restaurante = new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", null, "123456789");
        
        when(restauranteService.criarRestaurante(restaurante)).thenReturn(restaurante);
        
        ResponseEntity<Restaurante> response = restauranteController.criarRestaurante(restaurante);
        
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Restaurante Teste", response.getBody().getNome());
    }

    @Test
    public void testListarRestaurantes() {
        List<Restaurante> restaurantes = new ArrayList<>();
        restaurantes.add(new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", null, "123456789"));
        
        when(restauranteService.listarRestaurantes()).thenReturn(restaurantes);
        
        ResponseEntity<List<Restaurante>> response = restauranteController.listarRestaurantes();
        
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    public void testBuscarRestaurantePorId() {
        Restaurante restaurante = new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", null, "123456789");
        restaurante.setId(1L);
        
        when(restauranteService.buscarRestaurantePorId(1L)).thenReturn(Optional.of(restaurante));
        
        ResponseEntity<Restaurante> response = restauranteController.buscarRestaurantePorId(1L);
        
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Restaurante Teste", response.getBody().getNome());
    }

    @Test
    public void testAtualizarRestaurante() {
        Restaurante restauranteExistente = new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", null, "123456789");
        restauranteExistente.setId(1L);
        
        when(restauranteService.atualizarRestaurante(eq(1L), any(Restaurante.class))).thenReturn(restauranteExistente);
        
        ResponseEntity<Restaurante> response = restauranteController.atualizarRestaurante(1L, restauranteExistente);
        
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Restaurante Teste", response.getBody().getNome());
    }

    @Test
    public void testDeletarRestaurante() {
        doNothing().when(restauranteService).deletarRestaurante(1L);
        
        ResponseEntity<Void> response = restauranteController.deletarRestaurante(1L);
        
        assertEquals(204, response.getStatusCodeValue());
        verify(restauranteService, times(1)).deletarRestaurante(1L);
    }

    @Test
    public void testAdicionarAvaliacao() {
        Restaurante restaurante = new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", null, "123456789");
        restaurante.setId(1L);
        
        when(restauranteService.registrarAvaliacao(1L, 4.5)).thenReturn("Avalição registrada com sucesso");
        
        ResponseEntity<String> response = restauranteController.adicionarAvaliacao(1L, 4.5);
        
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Avalição registrada com sucesso", response.getBody());
    }
}
