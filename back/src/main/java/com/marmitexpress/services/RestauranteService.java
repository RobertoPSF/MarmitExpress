package com.marmitexpress.services;

import com.marmitexpress.exceptions.RestauranteNotFoundException;
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
        Restaurante restaurante = restauranteRepository.findById(id)
        .orElseThrow(() -> new RestauranteNotFoundException(id));
            restaurante.setAvaliacao(restauranteAtualizado.getAvaliacao());
            restaurante.setUsuario(restauranteAtualizado.getUsuario());
            restaurante.setSenha(restauranteAtualizado.getSenha());
            restaurante.setNome(restauranteAtualizado.getNome());
            restaurante.setEndereco(restauranteAtualizado.getEndereco());
            restaurante.setFoto(restauranteAtualizado.getFoto());
            restaurante.setAceitandoPedidos(restauranteAtualizado.isAceitandoPedidos());
            return restauranteRepository.save(restaurante);
        }

    public void deletarRestaurante(Long id) {
       if(!restauranteRepository.existsById(id)) {
           throw new RestauranteNotFoundException(id);
       }
       restauranteRepository.deleteById(id);
    }
}
