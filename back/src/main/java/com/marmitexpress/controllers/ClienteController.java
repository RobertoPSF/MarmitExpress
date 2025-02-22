package com.marmitexpress.controllers;

<<<<<<< HEAD
import com.marmitexpress.dto.LoginDTO;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.security.Interceptor;
=======
import com.marmitexpress.models.Cliente;
>>>>>>> main
import com.marmitexpress.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
<<<<<<< HEAD
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
=======
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")  // Injetando a variável de ambiente
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente) {
>>>>>>> main
        Cliente novoCliente = clienteService.criarCliente(cliente);
        return ResponseEntity.ok(novoCliente);
    }

    @GetMapping
<<<<<<< HEAD
    public ResponseEntity<List<Cliente>> listarClientes(@RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
=======
    public ResponseEntity<List<Cliente>> listarClientes() {
>>>>>>> main

        List<Cliente> clientes = clienteService.listarClientes();
        return ResponseEntity.ok(clientes);
    }

    @PutMapping("/{id}")
<<<<<<< HEAD
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteAtualizado, @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
=======
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
>>>>>>> main
        Cliente cliente = clienteService.atualizarCliente(id, clienteAtualizado);
        return cliente != null ? ResponseEntity.ok(cliente) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
<<<<<<< HEAD
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

=======
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }
>>>>>>> main
}
