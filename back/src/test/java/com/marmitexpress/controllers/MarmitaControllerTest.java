package com.marmitexpress.controllers;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.services.MarmitaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MarmitaController.class)
class MarmitaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MarmitaService marmitaService;

    @Test
    void testCriarMarmita() throws Exception {
        Marmita marmita = new Marmita(Collections.singletonList("Ingrediente Teste"));

        when(marmitaService.criarMarmita(any(Marmita.class))).thenReturn(marmita);

        mockMvc.perform(post("/marmitas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"componentes\":[\"Ingrediente Teste\"]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.componentes[0]").value("Ingrediente Teste"));
    }

    @Test
    void testListarMarmitas() throws Exception {
        when(marmitaService.listarMarmitas()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/marmitas"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void testDeletarMarmita() throws Exception {
        doNothing().when(marmitaService).deletarMarmita(1L);

        mockMvc.perform(delete("/marmitas/1"))
                .andExpect(status().isNoContent());
    }
}