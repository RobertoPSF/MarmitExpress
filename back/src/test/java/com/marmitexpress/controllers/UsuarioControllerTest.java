package com.marmitexpress.controllers;

import com.marmitexpress.dto.UsuarioDTO;
import com.marmitexpress.models.Usuario;
import com.marmitexpress.services.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UsuarioControllerTest {

    @Mock
    private UsuarioService usuarioService;

    @InjectMocks
    private UsuarioController usuarioController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Teste para o método criarUsuario
    @SuppressWarnings("null")
    @Test
    void testCriarUsuario() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setNome("João Silva");
        usuario.setEmail("joao@example.com");
        usuario.setSenha("senha123");
        usuario.setTelefone("123456789");

        Usuario usuarioSalvo = new Usuario();
        usuarioSalvo.setId(1L);
        usuarioSalvo.setNome(usuario.getNome());
        usuarioSalvo.setEmail(usuario.getEmail());
        usuarioSalvo.setSenha(usuario.getSenha());
        usuarioSalvo.setTelefone(usuario.getTelefone());

        when(usuarioService.criarUsuario(any(Usuario.class))).thenReturn(usuarioSalvo);

        // Act
        ResponseEntity<UsuarioDTO> response = usuarioController.criarUsuario(usuario);

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("João Silva", response.getBody().getNome());
        verify(usuarioService, times(1)).criarUsuario(any(Usuario.class));
    }

    // Teste para o método listarUsuarios
    @SuppressWarnings("null")
    @Test
    void testListarUsuarios() {
        // Arrange
        Usuario usuario1 = new Usuario();
        usuario1.setId(1L);
        usuario1.setNome("Maria Oliveira");
        usuario1.setEmail("maria@example.com");

        Usuario usuario2 = new Usuario();
        usuario2.setId(2L);
        usuario2.setNome("Carlos Souza");
        usuario2.setEmail("carlos@example.com");

        List<Usuario> usuarios = Arrays.asList(usuario1, usuario2);

        when(usuarioService.listarUsuarios()).thenReturn(usuarios);

        // Act
        ResponseEntity<List<UsuarioDTO>> response = usuarioController.listarUsuarios();

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(usuarioService, times(1)).listarUsuarios();
    }

    // Teste para o método buscarUsuarioPorId
    @SuppressWarnings("null")
    @Test
    void testBuscarUsuarioPorId() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("Ana Costa");
        usuario.setEmail("ana@example.com");

        when(usuarioService.buscarUsuarioPorId(1L)).thenReturn(usuario);

        // Act
        ResponseEntity<UsuarioDTO> response = usuarioController.buscarUsuarioPorId(1L);

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Ana Costa", response.getBody().getNome());
        verify(usuarioService, times(1)).buscarUsuarioPorId(1L);
    }

    // Teste para o método atualizarUsuario
    @SuppressWarnings("null")
    @Test
    void testAtualizarUsuario() {
        // Arrange
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setNome("Ana Costa Atualizada");
        usuarioDTO.setEmail("ana.atualizada@example.com");

        Usuario usuarioAtualizado = new Usuario();
        usuarioAtualizado.setId(1L);
        usuarioAtualizado .setNome(usuarioDTO.getNome());
        usuarioAtualizado.setEmail(usuarioDTO.getEmail());

        when(usuarioService.atualizarUsuario(eq(1L), any(Usuario.class))).thenReturn(usuarioAtualizado);

        // Act
        ResponseEntity<UsuarioDTO> response = usuarioController.atualizarUsuario(1L, usuarioDTO);

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Ana Costa Atualizada", response.getBody().getNome());
        verify(usuarioService, times(1)).atualizarUsuario(eq(1L), any(Usuario.class));
    }

    // Teste para o método deletarUsuario
    @Test
    void testDeletarUsuario() {
        // Arrange
        doNothing().when(usuarioService).deletarUsuario(1L);

        // Act
        ResponseEntity<Void> response = usuarioController.deletarUsuario(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(usuarioService, times(1)).deletarUsuario(1L);
    }

    // Teste para o método buscarUsuarioPorEmail
    @Test
    void testBuscarUsuarioPorEmail() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome("Pedro Almeida");
        usuario.setEmail("pedro@example.com");

        when(usuarioService.buscarUsuarioPorEmail("pedro@example.com")).thenReturn(usuario);

        // Act
        ResponseEntity<UsuarioDTO> response = usuarioController.buscarUsuarioPorEmail("pedro@example.com");

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Pedro Almeida", response.getBody().getNome());
        verify(usuarioService, times(1)).buscarUsuarioPorEmail("pedro@example.com");
    }
}