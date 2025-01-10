package com.marmitexpress.controllers;

import com.marmitexpress.dto.UsuarioDTO;
import com.marmitexpress.models.Usuario;
import com.marmitexpress.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Criar um novo usuário (RF-01)
    @PostMapping
    public ResponseEntity<UsuarioDTO> criarUsuario(@RequestBody Usuario usuario2) {
        // Converte o DTO para a entidade Usuario
        Usuario usuario = new Usuario();
        usuario.setNome(usuario2.getNome());
        usuario.setEmail(usuario2.getEmail());
        usuario.setSenha(usuario2.getSenha());
        usuario.setTelefone(usuario2.getTelefone());

        // Salva o usuário no banco de dados
        Usuario novoUsuario = usuarioService.criarUsuario(usuario);

        // Verifica se o usuário foi salvo com sucesso
        if (novoUsuario == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Retorna erro 500 se o usuário não foi salvo
        }

        // Converte a entidade salva de volta para DTO
        UsuarioDTO responseDTO = new UsuarioDTO(
                novoUsuario.getId(),
                novoUsuario.getNome(),
                novoUsuario.getEmail(),
                novoUsuario.getSenha(),
                novoUsuario.getTelefone()
        );

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    // Listar todos os usuários
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
        // Busca todos os usuários no banco de dados
        List<Usuario> usuarios = usuarioService.listarUsuarios();

        // Converte a lista de entidades para DTOs
        List<UsuarioDTO> usuariosDTO = usuarios.stream()
                .map(usuario -> new UsuarioDTO(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.getSenha(),
                        usuario.getTelefone()
                ))
                .collect(Collectors.toList());

        return new ResponseEntity<>(usuariosDTO, HttpStatus.OK);
    }

    // Buscar um usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorId(@PathVariable Long id) {
        // Busca o usuário pelo ID
        Usuario usuario = usuarioService.buscarUsuarioPorId(id);

        if (usuario != null) {
            // Converte a entidade para DTO
            UsuarioDTO usuarioDTO = new UsuarioDTO(
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getSenha(),
                    usuario.getTelefone()
            );
            return new ResponseEntity<>(usuarioDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Atualizar um usuário
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        // Converte o DTO para a entidade Usuario
        Usuario usuarioAtualizado = new Usuario();
        usuarioAtualizado.setNome(usuarioDTO.getNome());
        usuarioAtualizado.setEmail(usuarioDTO.getEmail());
        usuarioAtualizado.setSenha(usuarioDTO.getSenha());
        usuarioAtualizado.setTelefone(usuarioDTO.getTelefone());

        // Atualiza o usuário no banco de dados
        Usuario usuario = usuarioService.atualizarUsuario(id, usuarioAtualizado);

        if (usuario != null) {
            // Converte a entidade atualizada de volta para DTO
            UsuarioDTO responseDTO = new UsuarioDTO(
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getSenha(),
                    usuario.getTelefone()
            );
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deletar um usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        usuarioService.deletarUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Buscar um usuário por email
    @GetMapping("/email/{email}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorEmail(@PathVariable String email) {
        // Busca o usuário pelo email
        Usuario usuario = usuarioService.buscarUsuarioPorEmail(email);

        if (usuario != null) {
            // Converte a entidade para DTO
            UsuarioDTO usuarioDTO = new UsuarioDTO(
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getSenha(),
                    usuario.getTelefone()
            );
            return new ResponseEntity<>(usuarioDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}