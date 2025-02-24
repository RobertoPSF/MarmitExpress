package com.marmitexpress.controllers;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.services.MarmitaService;
import com.marmitexpress.security.Interceptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MarmitaController.class)
class MarmitaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MarmitaService marmitaService;

    @MockBean
    private Interceptor interceptor;

    @Test
    void testCriarMarmita() throws Exception {
        Marmita marmita = new Marmita();
        when(marmitaService.criarMarmita(any(Marmita.class))).thenReturn(marmita);

        mockMvc.perform(post("/marmitas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"tipo\":\"Marmita Tradicional\",\"preco\":25.0,\"quantidade\":1,\"foto\":null,\"restaurante\":null,\"ingredientes\":[\"Arroz\",\"Feijão\",\"Carne\"]}")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ingredientes[0]").value("Arroz"))
                .andExpect(jsonPath("$.ingredientes[1]").value("Feijão"))
                .andExpect(jsonPath("$.ingredientes[2]").value("Carne"));
    }

    @Test
    void testListarMarmitas() throws Exception {
        when(marmitaService.listarMarmitas()).thenReturn(Collections.emptyList());
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(false);

        mockMvc.perform(get("/marmitas")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void testListarMarmitasUnauthorized() throws Exception {
        when(interceptor.checkAuthorization(any(String.class))).thenReturn(true);

        mockMvc.perform(get("/marmitas")
                        .header("Authorization", "TokenInvalido"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testBuscarMarmitaPorId() throws Exception {
        Marmita marmita = new Marmita();
        when(marmitaService.buscarMarmitaPorId(1L)).thenReturn(Optional.of(marmita));

        mockMvc.perform(get("/marmitas/1")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ingredientes[0]").value("Arroz"))
                .andExpect(jsonPath("$.ingredientes[1]").value("Feijão"))
                .andExpect(jsonPath("$.ingredientes[2]").value("Carne"));
    }

    @Test
    void testDeletarMarmita() throws Exception {
        mockMvc.perform(delete("/marmitas/1")
                        .header("Authorization", "O#~Sn]9fnojT3'OO*:W9?C4"))
                .andExpect(status().isNoContent());
    }
}
