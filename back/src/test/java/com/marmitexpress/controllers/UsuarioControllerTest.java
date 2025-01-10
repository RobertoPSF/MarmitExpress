package com.marmitexpress.controllers;

import com.marmitexpress.models.Usuario;
import com.marmitexpress.services.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
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

    @Test
    void testCriarUsuario() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setNome("Carlos Souza");

        when(usuarioService.criarUsuario(usuario)).thenReturn(usuario);

        // Act
        ResponseEntity<Usuario> response = usuarioController.criarUsuario(usuario);

        // Assert
        assertNotNull(response.getBody());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Carlos Souza", response.getBody().getNome());
        verify(usuarioService, times(1)).criarUsuario(usuario);
    }
}
   