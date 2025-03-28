package com.marmitexpress.controllers;

import com.marmitexpress.dto.ClienteDTO;
import com.marmitexpress.dto.ClienteResponseDTO;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;
    
    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listarClientes() {
        List<ClienteResponseDTO> clientes = clienteService.listarClientes()
            .stream()
            .map(cliente -> new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getEndereco(),
                cliente.getTelefone(),
                cliente.getListaDePedidos()
            ))
            .toList();
        
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/me")
    public ResponseEntity<ClienteResponseDTO> buscarMeuPerfil() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);

        if (cliente != null) {
            return ResponseEntity.ok(new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getEndereco(),
                cliente.getTelefone(),
                cliente.getListaDePedidos()
            ));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<ClienteResponseDTO> atualizarPerfil(@RequestBody ClienteDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente clienteExistente = clienteService.buscarClientePorEmail(email);

        if (clienteExistente != null) {
            if (dto.getNome() != null) clienteExistente.setNome(dto.getNome());
            if (dto.getEndereco() != null) clienteExistente.setEndereco(dto.getEndereco());
            if (dto.getTelefone() != null) clienteExistente.setTelefone(dto.getTelefone());

            clienteService.criarCliente(clienteExistente);

            return ResponseEntity.ok(new ClienteResponseDTO(
                clienteExistente.getId(),
                clienteExistente.getNome(),
                clienteExistente.getEmail(),
                clienteExistente.getEndereco(),
                clienteExistente.getTelefone(),
                clienteExistente.getListaDePedidos()
            ));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable UUID id) {
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }

}
