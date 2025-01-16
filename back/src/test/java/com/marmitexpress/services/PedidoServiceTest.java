package com.marmitexpress.services;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Usuario;
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

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private MarmitaService marmitaService;

    @Mock
    private UsuarioService usuarioService;

    @InjectMocks
    private PedidoService pedidoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarPedido() {
        // Arrange
        Pedido pedido = new Pedido();
        pedido.setQuantidade(2);
        pedido.setValorTotal(20.0);

        Marmita marmita = new Marmita();
        marmita.setId(1L);
        marmita.setPreco(10.0);

        Usuario usuario = new Usuario();
        usuario.setId(1L);

        when(marmitaService.buscarMarmitaPorId(1L)).thenReturn(marmita);
        when(usuarioService.buscarUsuarioPorId(1L)).thenReturn(usuario);
        when(pedidoRepository.save(pedido)).thenReturn(pedido);

        // Act
        Pedido resultado = pedidoService.criarPedido(pedido);

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.getQuantidade());
        assertEquals(20.0, resultado.getValorTotal());
        verify(pedidoRepository, times(1)).save(pedido);
    }

    @Test
    public void testListarPedidos() {
        // Arrange
        Pedido pedido1 = new Pedido();
        pedido1.setQuantidade(2);
        pedido1.setValorTotal(20.0);

        Pedido pedido2 = new Pedido();
        pedido2.setQuantidade(3);
        pedido2.setValorTotal(30.0);

        when(pedidoRepository.findAll()).thenReturn(Arrays.asList(pedido1, pedido2));

        // Act
        List<Pedido> resultado = pedidoService.listarPedidos();

        // Assert
        assertEquals(2, resultado.size());
        verify(pedidoRepository, times(1)).findAll();
    }

    @Test
    public void testBuscarPedidoPorId() {
        // Arrange
        Pedido pedido = new Pedido();
        pedido.setId(1L);
        pedido.setQuantidade(2);
        pedido.setValorTotal(20.0);

        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        // Act
        Pedido resultado = pedidoService.buscarPedidoPorId(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.getQuantidade());
        assertEquals(20.0, resultado.getValorTotal());
        verify(pedidoRepository, times(1)).findById(1L);
    }

    @Test
    public void testBuscarPedidoPorId_NaoEncontrado() {
        // Arrange
        when(pedidoRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Pedido resultado = pedidoService.buscarPedidoPorId(1L);

        // Assert
        assertNull(resultado);
        verify(pedidoRepository, times(1)).findById(1L);
    }

    @Test
    public void testAtualizarStatusPedido() {
        // Arrange
        Pedido pedido = new Pedido();
        pedido.setId(1L);
        pedido.setQuantidade(2);
        pedido.setValorTotal(20.0);
        pedido.setStatus("Pendente");

        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        when(pedidoRepository.save(pedido)).thenReturn(pedido);

        // Act
        Pedido resultado = pedidoService.atualizarStatusPedido(1L, "Em preparo");

        // Assert
        assertNotNull(resultado);
        assertEquals("Em preparo", resultado.getStatus());
        verify(pedidoRepository, times(1)).findById(1L);
        verify(pedidoRepository, times(1)).save(pedido);
    }

    @Test
    public void testCancelarPedido() {
        // Arrange
        Pedido pedido = new Pedido();
        pedido.setId(1L);
        pedido.setQuantidade(2);
        pedido.setValorTotal(20.0);
        pedido.setStatus("Pendente");

        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        when(pedidoRepository.save(pedido)).thenReturn(pedido);

        // Act
        pedidoService.cancelarPedido(1L);

        // Assert
        assertEquals("Cancelado", pedido.getStatus());
        verify(pedidoRepository, times(1)).findById(1L);
        verify(pedidoRepository, times(1)).save(pedido);
    }

}