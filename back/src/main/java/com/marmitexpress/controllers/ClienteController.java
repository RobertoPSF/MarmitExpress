package com.marmitexpress.controllers;

import com.marmitexpress.models.Cliente;
import com.marmitexpress.services.ClienteService;
import com.marmitexpress.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        List<Cliente> clientes = clienteService.listarClientes();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/me")
    public ResponseEntity<Cliente> buscarMeuPerfil() {
        String email = tokenService.validateToken(SecurityContextHolder.getContext().getAuthentication().getName());
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<Cliente> atualizarPerfil(@RequestBody Cliente clienteAtualizado) {
        String email = tokenService.validateToken(SecurityContextHolder.getContext().getAuthentication().getName());
        Cliente clienteExistente = clienteService.buscarClientePorEmail(email);
        
        if (clienteExistente != null) {
            clienteExistente.setNome(clienteAtualizado.getNome());
            clienteExistente.setEndereco(clienteAtualizado.getEndereco());
            clienteExistente.setTelefone(clienteAtualizado.getTelefone());
            clienteService.criarCliente(clienteExistente);
            return ResponseEntity.ok(clienteExistente);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }
}
