package com.marmitexpress.services;

import com.marmitexpress.models.Usuario;
import com.marmitexpress.repositorys.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCriarUsuario() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setNome("João Silva");
        usuario.setEmail("joao@example.com");

        when(usuarioRepository.save(usuario)).thenReturn(usuario);

        // Act
        Usuario usuarioSalvo = usuarioService.criarUsuario(usuario);

        // Assert
        assertNotNull(usuarioSalvo);
        assertEquals("João Silva", usuarioSalvo.getNome());
        verify(usuarioRepository, times(1)).save(usuario);
    }

    @Test
    void testBuscarUsuarioPorId() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("Maria Oliveira");

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        // Act
        Usuario usuarioEncontrado = usuarioService.buscarUsuarioPorId(1L);

        // Assert
        assertNotNull(usuarioEncontrado);
        assertEquals("Maria Oliveira", usuarioEncontrado.getNome());
        verify(usuarioRepository, times(1)).findById(1L);
    }

    @Test
    void testBuscarUsuarioPorId_NaoEncontrado() {
        // Arrange
        when(usuarioRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Usuario usuarioEncontrado = usuarioService.buscarUsuarioPorId(1L);

        // Assert
        assertNull(usuarioEncontrado);
        verify(usuarioRepository, times(1)).findById(1L);
    }

    @Test
    void testDeletarUsuario() {
        // Arrange
        doNothing().when(usuarioRepository).deleteById(1L);

        // Act
        usuarioService.deletarUsuario(1L);

        // Assert
        verify(usuarioRepository, times(1)).deleteById(1L);
    }
}