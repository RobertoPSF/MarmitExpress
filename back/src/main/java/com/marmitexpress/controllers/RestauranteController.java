package com.marmitexpress.controllers;

import com.marmitexpress.models.Avaliacao;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.RestauranteService;
import com.marmitexpress.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/restaurantes")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    public ResponseEntity<List<Restaurante>> listarRestaurantes() {
        List<Restaurante> restaurantes = restauranteService.listarRestaurantes();
        return ResponseEntity.ok(restaurantes);
    }

    @GetMapping("/me")
    public ResponseEntity<Restaurante> buscarMeuPerfil() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);
        if (restaurante != null) {
            return ResponseEntity.ok(restaurante);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<Restaurante> atualizarPerfil(@RequestBody Restaurante restauranteAtualizado) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restauranteExistente = restauranteService.buscarRestaurantePorEmail(email);
        
        if (restauranteExistente != null) {
            restauranteExistente.setNome(restauranteAtualizado.getNome());
            restauranteExistente.setEndereco(restauranteAtualizado.getEndereco());
            restauranteExistente.setDescricao(restauranteAtualizado.getDescricao());
            restauranteExistente.setAceitandoPedidos(restauranteAtualizado.isAceitandoPedidos());
            restauranteService.criarRestaurante(restauranteExistente); // Salva as alterações
            return ResponseEntity.ok(restauranteExistente);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/avaliacao")
    public ResponseEntity<String> adicionarAvaliacao(@PathVariable Long id, @RequestBody Avaliacao avaliacaoRequest) {
        Double avaliacao = avaliacaoRequest.getAvaliacao();
        String mensagem = restauranteService.registrarAvaliacao(id, avaliacao);
        return ResponseEntity.ok(mensagem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRestaurante(@PathVariable Long id) {
        restauranteService.deletarRestaurante(id);
        return ResponseEntity.noContent().build();
    }
}
