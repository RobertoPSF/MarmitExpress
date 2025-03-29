package com.marmitexpress.services;

import com.marmitexpress.exceptions.RestauranteNotFoundException;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.repositorys.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public Optional<Restaurante> buscarRestaurantePorId(UUID id) {
        return restauranteRepository.findById(id);
    }

    public Restaurante buscarRestaurantePorEmail(String email) {
        return restauranteRepository.findByEmail(email).orElse(null); // Busca pelo email
    }

    public Restaurante atualizarRestaurante(UUID id, Restaurante restauranteAtualizado) {
        Restaurante restaurante = restauranteRepository.findById(id)
                .orElseThrow(() -> new RestauranteNotFoundException());
        restaurante.setSenha(restauranteAtualizado.getSenha());
        restaurante.setNomeRestaurante(restauranteAtualizado.getNomeRestaurante());
        restaurante.setNomeProprietario(restauranteAtualizado.getNomeProprietario());
        restaurante.setEndereco(restauranteAtualizado.getEndereco());
        restaurante.setAceitandoPedidos(restauranteAtualizado.isAceitandoPedidos());
        restaurante.setDescricao(restauranteAtualizado.getDescricao());
        return restauranteRepository.save(restaurante);
    }

    public void deletarRestaurante(UUID id) {
        if (!restauranteRepository.existsById(id)) {
            throw new RestauranteNotFoundException();
        }
        restauranteRepository.deleteById(id);
    }
}