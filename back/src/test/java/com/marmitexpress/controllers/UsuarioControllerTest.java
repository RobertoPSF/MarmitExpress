package com.marmitexpress.controllers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.marmitexpress.dto.UsuarioDTO;
import com.marmitexpress.dto.UsuarioResponseDTO;
import com.marmitexpress.models.Usuario;
import com.marmitexpress.services.UsuarioService;
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
    @Test
    void testCriarUsuario() {
        // Arrange
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setNome("João Silva");
        usuarioDTO.setEmail("joao@example.com");
        usuarioDTO.setSenha("senha123");
        usuarioDTO.setTelefone("123456789");

        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setSenha(usuarioDTO.getSenha());
        usuario.setTelefone(usuarioDTO.getTelefone());

        when(usuarioService.criarUsuario(any(Usuario.class))).thenReturn(usuario);

        // Act
        ResponseEntity<UsuarioResponseDTO> response = usuarioController.criarUsuario(usuarioDTO);

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("João Silva", response.getBody().getNome());
        verify(usuarioService, times(1)).criarUsuario(any(Usuario.class));
    }

    // Teste para o método atualizarUsuario
    @Test
    void testAtualizarUsuario() {
        // Arrange
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setNome("Ana Costa Atualizada");
        usuarioDTO.setEmail("ana.atualizada@example.com");
        usuarioDTO.setSenha("senha123");
        usuarioDTO.setTelefone("987654321");

        Usuario usuarioAtualizado = new Usuario();
        usuarioAtualizado.setId(1L);
        usuarioAtualizado.setNome(usuarioDTO.getNome());
        usuarioAtualizado.setEmail(usuarioDTO.getEmail());
        usuarioAtualizado.setSenha(usuarioDTO.getSenha());
        usuarioAtualizado.setTelefone(usuarioDTO.getTelefone());

        when(usuarioService.atualizarUsuario(eq(1L), any(Usuario.class))).thenReturn(usuarioAtualizado);

        // Act
        ResponseEntity<UsuarioResponseDTO> response = usuarioController.atualizarUsuario(1L, usuarioDTO);

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
        usuario.setNome("Ana Costa");
        usuario.setEmail("ana@example.com");
        usuario.setTelefone("123456789");

        when(usuarioService.buscarUsuarioPorEmail("ana@example.com")).thenReturn(usuario);

        // Act
        ResponseEntity<UsuarioResponseDTO> response = usuarioController.buscarUsuarioPorEmail("ana@example.com");

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Ana Costa", response.getBody().getNome());
        verify(usuarioService, times(1)).buscarUsuarioPorEmail("ana@example.com");
    }
}