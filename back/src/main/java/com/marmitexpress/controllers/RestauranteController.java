package com.marmitexpress.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marmitexpress.dto.RestauranteDTO;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.RestauranteService;

@RestController
@RequestMapping("/restaurantes")
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    // Criar um novo restaurante
    @PostMapping
    public ResponseEntity<RestauranteDTO> criarRestaurante(@RequestBody RestauranteDTO restauranteDTO) {
        // Converter DTO para entidade
        Restaurante restaurante = new Restaurante();
        restaurante.setNome(restauranteDTO.getNome());
        restaurante.setEndereco(restauranteDTO.getEndereco());
        restaurante.setTelefone(restauranteDTO.getTelefone());

        // Salvar no banco de dados
        Restaurante novoRestaurante = restauranteService.criarRestaurante(restaurante);

        // Converter entidade para DTO
        RestauranteDTO responseDTO = new RestauranteDTO();
        responseDTO.setId(novoRestaurante.getId());
        responseDTO.setNome(novoRestaurante.getNome());
        responseDTO.setEndereco(novoRestaurante.getEndereco());
        responseDTO.setTelefone(novoRestaurante.getTelefone());

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    // Listar todos os restaurantes
    @GetMapping
    public ResponseEntity<List<RestauranteDTO>> listarRestaurantes() {
        List<Restaurante> restaurantes = restauranteService.listarRestaurantes();

        // Converter lista de entidades para lista de DTOs
        List<RestauranteDTO> restaurantesDTO = restaurantes.stream()
                .map(restaurante -> {
                    RestauranteDTO dto = new RestauranteDTO();
                    dto.setId(restaurante.getId());
                    dto.setNome(restaurante.getNome());
                    dto.setEndereco(restaurante.getEndereco());
                    dto.setTelefone(restaurante.getTelefone());
                    return dto;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(restaurantesDTO, HttpStatus.OK);
    }

    // Buscar um restaurante por ID
    @GetMapping("/{id}")
    public ResponseEntity<RestauranteDTO> buscarRestaurantePorId(@PathVariable Long id) {
        Restaurante restaurante = restauranteService.buscarRestaurantePorId(id).orElse(null);

        if (restaurante != null) {
            // Converter entidade para DTO
            RestauranteDTO responseDTO = new RestauranteDTO();
            responseDTO.setId(restaurante.getId());
            responseDTO.setNome(restaurante.getNome());
            responseDTO.setEndereco(restaurante.getEndereco());
            responseDTO.setTelefone(restaurante.getTelefone());

            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Atualizar um restaurante
    @PutMapping("/{id}")
    public ResponseEntity<RestauranteDTO> atualizarRestaurante(@PathVariable Long id, @RequestBody RestauranteDTO restauranteDTO) {
        // Converter DTO para entidade
        Restaurante restauranteAtualizado = new Restaurante();
        restauranteAtualizado.setNome(restauranteDTO.getNome());
        restauranteAtualizado.setEndereco(restauranteDTO.getEndereco());
        restauranteAtualizado.setTelefone(restauranteDTO.getTelefone());

        // Atualizar no banco de dados
        Restaurante restaurante = restauranteService.atualizarRestaurante(id, restauranteAtualizado);

        if (restaurante != null) {
            // Converter entidade para DTO
            RestauranteDTO responseDTO = new RestauranteDTO();
            responseDTO.setId(restaurante.getId());
            responseDTO.setNome(restaurante.getNome());
            responseDTO.setEndereco(restaurante.getEndereco());
            responseDTO.setTelefone(restaurante.getTelefone());

            return new ResponseEntity<>(responseDTO , HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deletar um restaurante
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRestaurante(@PathVariable Long id) {
        restauranteService.deletarRestaurante(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}