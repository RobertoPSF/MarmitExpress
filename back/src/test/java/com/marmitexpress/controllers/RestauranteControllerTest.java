package com.marmitexpress.controllers;

import com.marmitexpress.models.Restaurante;
import com.marmitexpress.security.Interceptor;
import com.marmitexpress.services.RestauranteService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RestauranteController.class)
class RestauranteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestauranteService restauranteService;

    @MockBean
    private Interceptor interceptor;

    @Test
    void testCriarRestaurante() throws Exception {
        Restaurante restaurante = new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", "123456789", "Descricao");

        when(restauranteService.criarRestaurante(any(Restaurante.class))).thenReturn(restaurante);
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false); 

        mockMvc.perform(post("/restaurantes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuario\":\"usuario\",\"senha\":\"senha\",\"nome\":\"Restaurante Teste\",\"endereco\":\"Endereco\",\"telefone\":\"123456789\"}")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Restaurante Teste"));
    }

    @Test
    void testListarRestaurantes() throws Exception {
        when(restauranteService.listarRestaurantes()).thenReturn(Collections.emptyList());
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false); 

        mockMvc.perform(get("/restaurantes")
                .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void testBuscarRestaurantePorId() throws Exception {
        Restaurante restaurante = new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", "123456789", "Descricao");
        restaurante.setId(1L);

        when(restauranteService.buscarRestaurantePorId(1L)).thenReturn(Optional.of(restaurante));
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false); 

        mockMvc.perform(get("/restaurantes/1")
                .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Restaurante Teste"));
    }

    @Test
    void testAtualizarRestaurante() throws Exception {
        Restaurante restauranteExistente = new Restaurante("usuario", "senha", "Restaurante Teste", "Endereco", "123456789", "Descricao");
        restauranteExistente.setId(1L);

        when(restauranteService.atualizarRestaurante(Mockito.eq(1L), any(Restaurante.class))).thenReturn(new Restaurante("usuario", "senha", "Restaurante Atualizado", "Endereco", "123456789", "Descricao"));
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false); 

        mockMvc.perform(put("/restaurantes/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nome\":\"Restaurante Atualizado\"}")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Restaurante Atualizado"));
    }

    @Test
    void testDeletarRestaurante() throws Exception {
        doNothing().when(restauranteService).deletarRestaurante(1L);

        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false); 

        mockMvc.perform(delete("/restaurantes/1")
                .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testAdicionarAvaliacao() throws Exception {
        when(restauranteService.registrarAvaliacao(1L, 4.5)).thenReturn("Avaliação registrada com sucesso");
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false);

        mockMvc.perform(put("/restaurantes/1/avaliacao")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"avaliacao\":4.5}")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(content().string("Avaliação registrada com sucesso"));
    }


    @Test
    public void testLoginRestaurante() throws Exception {
        when(restauranteService.loginRestaurante("usuario", "senha")).thenReturn(1L);
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false); 

        mockMvc.perform(post("/restaurantes/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuario\":\"usuario\",\"senha\":\"senha\"}")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }
}