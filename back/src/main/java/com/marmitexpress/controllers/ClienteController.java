package com.marmitexpress.controllers;

import com.marmitexpress.dto.LoginDTO;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.security.Interceptor;
import com.marmitexpress.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ClienteController {

    @Autowired
    private Interceptor interceptor;

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente, @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
        Cliente novoCliente = clienteService.criarCliente(cliente);
        return ResponseEntity.ok(novoCliente);
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes(@RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }

        List<Cliente> clientes = clienteService.listarClientes();
        return ResponseEntity.ok(clientes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteAtualizado, @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
        Cliente cliente = clienteService.atualizarCliente(id, clienteAtualizado);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id, @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Long> loginCliente(@RequestBody LoginDTO loginDTO, @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
        Long id = clienteService.loginCliente(loginDTO.getUsuario(), loginDTO.getSenha());
        return id != null ? ResponseEntity.ok(id) : ResponseEntity.status(401).build();
    }

}
