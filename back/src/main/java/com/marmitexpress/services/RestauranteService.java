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

    public Restaurante criarRestaurante(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    public List<Restaurante> listarRestaurantes() {
        return restauranteRepository.findAll();
    }

    public Optional<Restaurante> buscarRestaurantePorId(Long id) {
        return restauranteRepository.findById(id);
    }

    public Restaurante atualizarRestaurante(Long id, Restaurante restauranteAtualizado) {
        Optional<Restaurante> restauranteExistente = restauranteRepository.findById(id);
        if (restauranteExistente.isPresent()) {
            Restaurante restaurante = restauranteExistente.get();
            restaurante.setAvaliacao(restauranteAtualizado.getAvaliacao());
            restaurante.setUsuario(restauranteAtualizado.getUsuario());
            restaurante.setSenha(restauranteAtualizado.getSenha());
            restaurante.setNome(restauranteAtualizado.getNome());
            restaurante.setEndereco(restauranteAtualizado.getEndereco());
            restaurante.setFoto(restauranteAtualizado.getFoto());
            restaurante.setAceitandoPedidos(restauranteAtualizado.isAceitandoPedidos());
            return restauranteRepository.save(restaurante);
        } else {
            // Lidar com o caso em que o restaurante não é encontrado
            return null; // ou lançar uma exceção
        }
    }

    public void deletarRestaurante(Long id) {
        restauranteRepository.deleteById(id);
    }
}
