package com.marmitexpress.services;

import com.marmitexpress.models.Restaurante;
import com.marmitexpress.repositorys.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestauranteService {

    @Autowired
    private RestauranteRepository restauranteRepository;

    // Criar um novo restaurante
    public Restaurante criarRestaurante(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    // Listar todos os restaurantes
    public List<Restaurante> listarRestaurantes() {
        return restauranteRepository.findAll();
    }

    // Buscar um restaurante por ID
    public Optional<Restaurante> buscarRestaurantePorId(Long id) {
        return restauranteRepository.findById(id);
    }

    // Atualizar um restaurante
    public Restaurante atualizarRestaurante(Long id, Restaurante restauranteAtualizado) {
        return restauranteRepository.findById(id)
                .map(restauranteExistente -> {
                    restauranteExistente.setNome(restauranteAtualizado.getNome());
                    restauranteExistente.setSenha(restauranteAtualizado.getSenha());
                    restauranteExistente.setEndereco(restauranteAtualizado.getEndereco());
                    restauranteExistente.setTelefone(restauranteAtualizado.getTelefone());
                    return restauranteRepository.save(restauranteExistente);
                })
                .orElse(null); // Retorna null se o restaurante não for encontrado
    }

    // Deletar um restaurante por ID
    public void deletarRestaurante(Long id) {
        restauranteRepository.deleteById(id);
    }

    // Buscar restaurantes por nome
    public List<Restaurante> buscarRestaurantesPorNome(String nome) {
        return restauranteRepository.findByNomeContainingIgnoreCase(nome);
    }

    // Buscar restaurantes por endereço
    public List<Restaurante> buscarRestaurantesPorEndereco(String endereco) {
        return restauranteRepository.findByEndereco(endereco);
    }

    // Verificar se um restaurante existe por ID
    public boolean existeRestaurantePorId(Long id) {
        return restauranteRepository.existsById(id);
    }

    // Buscar restaurantes com marmitas disponíveis
    public List<Restaurante> buscarRestaurantesComMarmitas() {
        return restauranteRepository.findByMarmitasIsNotEmpty();
    }

    // Buscar restaurantes por intervalo de IDs
    public List<Restaurante> buscarRestaurantesPorIntervaloDeIds(Long startId, Long endId) {
        return restauranteRepository.findByIdBetween(startId, endId);
    }

    // Buscar restaurantes ordenados por nome (ascendente)
    public List<Restaurante> listarRestaurantesOrdenadosPorNome() {
        return restauranteRepository.findAllByOrderByNomeAsc();
    }

    // Buscar restaurantes por lista de IDs
    public List<Restaurante> buscarRestaurantesPorIds(List<Long> ids) {
        return restauranteRepository.findByIdIn(ids);
    }

    // Buscar restaurantes por nome ou endereço
    public List<Restaurante> buscarRestaurantesPorNomeOuEndereco(String nome, String endereco) {
        return restauranteRepository.findByNomeOrEndereco(nome, endereco);
    }

    // Buscar restaurantes com nome que começa com uma letra
    public List<Restaurante> buscarRestaurantesPorInicioDoNome(String prefixo) {
        return restauranteRepository.findByNomeStartingWith(prefixo);
    }

    // Buscar restaurantes com nome que termina com uma letra
    public List<Restaurante> buscarRestaurantesPorFimDoNome(String sufixo) {
        return restauranteRepository.findByNomeEndingWith(sufixo);
    }

    // Buscar restaurantes com IDs diferentes de um valor
    public List<Restaurante> buscarRestaurantesComIdsDiferentes(Long id) {
        return restauranteRepository.findByIdNot(id);
    }

    // Buscar restaurantes ordenados por ID (ascendente)
    public List<Restaurante> listarRestaurantesOrdenadosPorIdAsc() {
        return restauranteRepository.findAllByOrderByIdAsc();
    }

    // Buscar restaurantes ordenados por ID (descendente)
    public List<Restaurante> listarRestaurantesOrdenadosPorIdDesc() {
        return restauranteRepository.findAllByOrderByIdDesc();
    }

    // Buscar restaurante por ID e nome
    public Optional<Restaurante> buscarRestaurantePorIdENome(Long id, String nome) {
        return restauranteRepository.findByIdAndNome(id, nome);
    }

    // Buscar restaurantes por ID ou nome
    public List<Restaurante> buscarRestaurantesPorIdOuNome(Long id, String nome) {
        return restauranteRepository.findByIdOrNome(id, nome);
    }

    // Contar restaurantes por nome
    public Long contarRestaurantesPorNome(String nome) {
        return restauranteRepository.countByNome(nome);
    }
}