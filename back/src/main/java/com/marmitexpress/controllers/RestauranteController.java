package com.marmitexpress.controllers;

import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurantes")
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    // Criar um novo restaurante
    @PostMapping
    public ResponseEntity<Restaurante> criarRestaurante(@RequestBody Restaurante restaurante) {
        Restaurante novoRestaurante = restauranteService.criarRestaurante(restaurante);
        return new ResponseEntity<>(novoRestaurante, HttpStatus.CREATED);
    }

    // Listar todos os restaurantes
    @GetMapping
    public ResponseEntity<List<Restaurante>> listarRestaurantes() {
        List<Restaurante> restaurantes = restauranteService.listarRestaurantes();
        return new ResponseEntity<>(restaurantes, HttpStatus.OK);
    }

    // Buscar um restaurante por ID
    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> buscarRestaurantePorId(@PathVariable Long id) {
        Optional<Restaurante> restaurante = restauranteService.buscarRestaurantePorId(id);
        return restaurante.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Atualizar um restaurante
    @PutMapping("/{id}")
    public ResponseEntity<Restaurante> atualizarRestaurante(@PathVariable Long id, @RequestBody Restaurante restauranteAtualizado) {
        Restaurante restaurante = restauranteService.atualizarRestaurante(id, restauranteAtualizado);
        if (restaurante != null) {
            return new ResponseEntity<>(restaurante, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deletar um restaurante por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRestaurante(@PathVariable Long id) {
        restauranteService.deletarRestaurante(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Buscar restaurantes por nome
    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<Restaurante>> buscarRestaurantesPorNome(@PathVariable String nome) {
        List<Restaurante> restaurantes = restauranteService.buscarRestaurantesPorNome(nome);
        return new ResponseEntity<>(restaurantes, HttpStatus.OK);
    }

    // Buscar restaurantes por endereço
    @GetMapping("/endereco/{endereco}")
    public ResponseEntity<List<Restaurante>> buscarRestaurantesPorEndereco(@PathVariable String endereco) {
        List<Restaurante> restaurantes = restauranteService.buscarRestaurantesPorEndereco(endereco);
        return new ResponseEntity<>(restaurantes, HttpStatus.OK);
    }

    // Buscar restaurantes com marmitas disponíveis
    @GetMapping("/com-marmitas")
    public ResponseEntity<List<Restaurante>> buscarRestaurantesComMarmitas() {
        List<Restaurante> restaurantes = restauranteService.buscarRestaurantesComMarmitas();
        return new ResponseEntity<>(restaurantes, HttpStatus.OK);
    }

    // Buscar restaurantes por intervalo de IDs
    @GetMapping("/intervalo-ids")
    public ResponseEntity<List<Restaurante>> buscarRestaurantesPorIntervaloDeIds(
            @RequestParam Long startId, @RequestParam Long endId) {
        List<Restaurante> restaurantes = restauranteService.buscarRestaurantesPorIntervaloDeIds(startId, endId);
        return new ResponseEntity<>(restaurantes, HttpStatus.OK);
    }

}