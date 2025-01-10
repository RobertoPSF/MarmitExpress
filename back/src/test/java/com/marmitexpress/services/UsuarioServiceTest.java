package com.marmitexpress.services;

import com.marmitexpress.dto.UsuarioDTO;
import com.marmitexpress.models.Usuario;
import com.marmitexpress.repositorys.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
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
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setNome("João Silva");
        usuarioDTO.setEmail("joao@example.com");

        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());

        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        // Act
        Usuario usuarioSalvo = usuarioService.criarUsuario(usuario);

        // Assert
        assertNotNull(usuarioSalvo);
        assertEquals("João Silva", usuarioSalvo.getNome());
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    void testListarUsuarios() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("Maria Oliveira");
        usuario.setEmail("maria@example.com");

        when(usuarioRepository.findAll()).thenReturn(Collections.singletonList(usuario));

        // Act
        List<Usuario> usuarios = usuarioService.listarUsuarios();

        // Assert
        assertNotNull(usuarios);
        assertEquals(1, usuarios.size());
        assertEquals("Maria Oliveira", usuarios.get(0).getNome());
        verify(usuarioRepository, times(1)).findAll();
    }

    @Test
    void testBuscarUsuarioPorId() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("Carlos Souza");
        usuario.setEmail("carlos@example.com");

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        // Act
        Usuario usuarioEncontrado = usuarioService.buscarUsuarioPorId(1L);

        // Assert
        assertNotNull(usuarioEncontrado);
        assertEquals("Carlos Souza", usuarioEncontrado.getNome());
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
    void testAtualizarUsuario() {
        // Arrange
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setNome("Ana Costa");
        usuarioDTO.setEmail("ana@example.com");

        Usuario usuarioExistente = new Usuario();
        usuarioExistente.setId(1L);
        usuarioExistente.setNome("Ana Silva");
        usuarioExistente.setEmail("ana.silva@example.com");

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioExistente));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioExistente);

        // Act
        Usuario usuarioAtualizado = usuarioService.atualizarUsuario(1L, usuarioExistente);

        // Assert
        assertNotNull(usuarioAtualizado);
        assertEquals("Ana Costa", usuarioAtualizado.getNome());
        verify(usuarioRepository, times(1)).findById(1L);
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
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