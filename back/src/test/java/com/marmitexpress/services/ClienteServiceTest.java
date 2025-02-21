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
        Cliente cliente = new Cliente();
        cliente.setUsuario("usuario");
        cliente.setSenha("senha");

        when(clienteRepository.save(cliente)).thenReturn(cliente);

        Cliente clienteCriado = clienteService.criarCliente(cliente);
        assertNotNull(clienteCriado);
        assertEquals("usuario", clienteCriado.getUsuario());
    }

    @Test
    public void testListarClientes() {
        List<Cliente> clientes = new ArrayList<>();
        clientes.add(new Cliente());
        when(clienteRepository.findAll()).thenReturn(clientes);

        List<Cliente> resultado = clienteService.listarClientes();
        assertEquals(1, resultado.size());
    }

    @Test
    public void testBuscarClientePorId() {
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        Optional<Cliente> resultado = clienteService.buscarClientePorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals(1L, resultado.get().getId());
    }

    @Test
    public void testAtualizarCliente() {
        Cliente clienteExistente = new Cliente();
        clienteExistente.setId(1L);
        clienteExistente.setUsuario("usuario");

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(clienteExistente));
        when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteExistente);

        Cliente clienteAtualizado = new Cliente();
        clienteAtualizado.setUsuario("usuarioAtualizado");

        Cliente resultado = clienteService.atualizarCliente(1L, clienteAtualizado);
        assertNotNull(resultado);
        assertEquals("usuarioAtualizado", resultado.getUsuario());
    }

    @Test
    public void testDeletarCliente() {
        Long id = 1L;
        doNothing().when(clienteRepository).deleteById(id);
        clienteService.deletarCliente(id);
        verify(clienteRepository, times(1)).deleteById(id);
    }

    @Test
    public void testLoginCliente() {
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        cliente.setUsuario("usuario");
        cliente.setSenha("senha");

        when(clienteRepository.findByUsuario("usuario")).thenReturn(Optional.of(cliente));

        Long id = clienteService.loginCliente("usuario", "senha");
        assertNotNull(id);
        assertEquals(cliente.getId(), id);
    }
}
