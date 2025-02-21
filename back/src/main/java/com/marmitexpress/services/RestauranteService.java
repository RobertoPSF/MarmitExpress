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

    public String registrarAvaliacao(long id, double avaliacao){
        Optional<Restaurante> restaurante = buscarRestaurantePorId(id);
        if(restaurante.isPresent()){
            restaurante.get().adicionarAvaliacao(avaliacao);
            return "Avalição registrada com sucesso";
        }
        else {
            throw new RestauranteNotFoundException(id);
        }
    }

    public Restaurante atualizarRestaurante(Long id, Restaurante restauranteAtualizado) {
        Restaurante restaurante = restauranteRepository.findById(id)
        .orElseThrow(() -> new RestauranteNotFoundException(id));
            restaurante.setSenha(restauranteAtualizado.getSenha());
            restaurante.setNome(restauranteAtualizado.getNome());
            restaurante.setEndereco(restauranteAtualizado.getEndereco());
            restaurante.setAceitandoPedidos(restauranteAtualizado.isAceitandoPedidos());
            restaurante.setDescricao(restauranteAtualizado.getDescricao());
            return restauranteRepository.save(restaurante);
        }

    public void deletarRestaurante(Long id) {
       if(!restauranteRepository.existsById(id)) {
           throw new RestauranteNotFoundException(id);
       }
       restauranteRepository.deleteById(id);
    }
}
