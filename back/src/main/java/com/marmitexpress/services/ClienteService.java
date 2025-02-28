package com.marmitexpress.services;

import com.marmitexpress.models.Cliente;
import com.marmitexpress.repositorys.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente criarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente buscarClientePorId(UUID id) {
        return clienteRepository.findById(id).orElse(null); 
    }

    public Cliente buscarClientePorEmail(String email) {
        return clienteRepository.findByEmail(email).orElse(null); 
    }

    public Cliente atualizarCliente(UUID id, Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);
        if (clienteExistente.isPresent()) {
            Cliente cliente = clienteExistente.get();
            cliente.setSenha(clienteAtualizado.getSenha());
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setEmail(clienteAtualizado.getEmail());
            return clienteRepository.save(cliente);
        } else {
            return null; 
        }
    }

    public void deletarCliente(UUID id) {
        clienteRepository.deleteById(id);
    }
}