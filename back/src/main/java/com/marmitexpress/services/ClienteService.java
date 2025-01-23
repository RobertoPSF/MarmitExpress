package com.marmitexpress.services;

import com.marmitexpress.models.Cliente;
import com.marmitexpress.repositorys.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Cliente> buscarClientePorId(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente atualizarCliente(Long id, Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);
        if (clienteExistente.isPresent()) {
            Cliente cliente = clienteExistente.get();
            cliente.setUsuario(clienteAtualizado.getUsuario());
            cliente.setSenha(clienteAtualizado.getSenha());
            cliente.setEndereco(clienteAtualizado.getEndereco());
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setTelefone(clienteAtualizado.getTelefone());
            return clienteRepository.save(cliente);
        } else {
            // Lidar com o caso em que o cliente não é encontrado
            return null; // ou lançar uma exceção
        }
    }

    public void deletarCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
