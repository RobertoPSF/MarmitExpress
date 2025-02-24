package com.marmitexpress.services;

import com.marmitexpress.models.Cliente;
import com.marmitexpress.repositorys.ClienteRepository;
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

public class ClienteServiceTest {

    @InjectMocks
    private ClienteService clienteService;

    @Mock
    private ClienteRepository clienteRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarCliente() {
        Cliente cliente = new Cliente("Nome Cliente", "cliente@teste.com", "senha");

        when(clienteRepository.save(cliente)).thenReturn(cliente);

        Cliente clienteCriado = clienteService.criarCliente(cliente);
        assertNotNull(clienteCriado);
        assertEquals("Nome Cliente", clienteCriado.getNome());
    }

    @Test
    public void testListarClientes() {
        List<Cliente> clientes = new ArrayList<>();
        clientes.add(new Cliente("Nome Cliente", "cliente@teste.com", "senha"));
        when(clienteRepository.findAll()).thenReturn(clientes);

        List<Cliente> resultado = clienteService.listarClientes();
        assertEquals(1, resultado.size());
    }

    @Test
    public void testBuscarClientePorEmail() {
        Cliente cliente = new Cliente("Nome Cliente", "cliente@teste.com", "senha");
        when(clienteRepository.findByEmail("cliente@teste.com")).thenReturn(Optional.of(cliente));

        Cliente resultado = clienteService.buscarClientePorEmail("cliente@teste.com");
        assertNotNull(resultado);
        assertEquals("cliente@teste.com", resultado.getEmail());
    }

    @Test
    public void testAtualizarCliente() {
        Cliente clienteExistente = new Cliente("Nome Cliente", "cliente@teste.com", "senha");

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(clienteExistente));
        when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteExistente);

        Cliente clienteAtualizado = new Cliente("Nome Atualizado", "cliente@teste.com", "senha");

        Cliente resultado = clienteService.atualizarCliente(1L, clienteAtualizado);
        assertNotNull(resultado);
        assertEquals("Nome Atualizado", resultado.getNome());
    }

    @Test
    public void testDeletarCliente() {
        Long id = 1L;
        doNothing().when(clienteRepository).deleteById(id);
        clienteService.deletarCliente(id);
        verify(clienteRepository, times(1)).deleteById(id);
    }
}
