package com.marmitexpress.services;

import com.marmitexpress.exceptions.PedidoNotFoundException;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.repositorys.PedidoRepository;
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

public class PedidoServiceTest {

    @InjectMocks
    private PedidoService pedidoService;

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private Restaurante restaurante;

    @Mock
    private Cliente usuario;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarPedido() {
        Pedido pedido = new Pedido(restaurante, 45.90, usuario, "Rua Exemplo, 123");

        when(pedidoRepository.save(pedido)).thenReturn(pedido);

        Pedido pedidoCriado = pedidoService.criarPedido(pedido);
        assertNotNull(pedidoCriado);
        assertEquals(45.90, pedidoCriado.getPreco());
        assertEquals("Rua Exemplo, 123", pedidoCriado.getEndereco());
        assertEquals(usuario, pedidoCriado.getCliente());
        assertEquals(restaurante, pedidoCriado.getRestaurante());
    }

    @Test
    public void testListarPedidos() {
        List<Pedido> pedidos = Arrays.asList(
            new Pedido(restaurante, 30.00, usuario, "Av. Principal, 456"),
            new Pedido(restaurante, 50.00, usuario, "Rua Nova, 789")
        );

        when(pedidoRepository.findAll()).thenReturn(pedidos);

        List<Pedido> resultado = pedidoService.listarPedidos();
        assertEquals(2, resultado.size());
        assertEquals(50.00, resultado.get(1).getPreco());
    }

    @Test
    public void testBuscarPedidoPorId_Existe() {
        Pedido pedido = new Pedido(restaurante, 20.00, usuario, "Av. Teste, 321");
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        Optional<Pedido> resultado = pedidoService.buscarPedidoPorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals(20.00, resultado.get().getPreco());
    }

    @Test
    public void testBuscarPedidoPorId_NaoExiste() {
        when(pedidoRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Pedido> resultado = pedidoService.buscarPedidoPorId(99L);
        assertFalse(resultado.isPresent());
    }

    @Test
    public void testDeletarPedido_Existe() {
        when(pedidoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(pedidoRepository).deleteById(1L);

        assertDoesNotThrow(() -> pedidoService.deletarPedido(1L));
        verify(pedidoRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeletarPedido_NaoExiste() {
        when(pedidoRepository.existsById(99L)).thenReturn(false);

        assertThrows(PedidoNotFoundException.class, () -> pedidoService.deletarPedido(99L));
    }
}
