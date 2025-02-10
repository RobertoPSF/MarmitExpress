package com.marmitexpress.controllers;

import com.marmitexpress.models.Cliente;
import com.marmitexpress.services.ClienteService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClienteController.class)
class ClienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClienteService clienteService;

    @Test
    void testCriarCliente() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setUsuario("usuario");
        cliente.setSenha("senha");

        when(clienteService.criarCliente(any(Cliente.class))).thenReturn(cliente);

        mockMvc.perform(post("/clientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuario\":\"usuario\",\"senha\":\"senha\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.usuario").value("usuario"));
    }

    @Test
    void testListarClientes() throws Exception {
        when(clienteService.listarClientes()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/clientes"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void testAtualizarCliente() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setUsuario("usuarioAtualizado");

        when(clienteService.atualizarCliente(Mockito.eq(1L), any(Cliente.class))).thenReturn(cliente);

        mockMvc.perform(put("/clientes/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"usuario\":\"usuarioAtualizado\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.usuario").value("usuarioAtualizado"));
    }

    @Test
    void testDeletarCliente() throws Exception {
        mockMvc.perform(delete("/clientes/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testLoginCliente() throws Exception {
        when(clienteService.loginCliente("usuario", "senha")).thenReturn(1L);

        mockMvc.perform(post("/clientes/login")
                        .param("usuario", "usuario")
                        .param("senha", "senha"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }
}
