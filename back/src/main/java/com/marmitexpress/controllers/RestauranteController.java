package com.marmitexpress.controllers;

import com.marmitexpress.dto.RestauranteDTO;
import com.marmitexpress.dto.RestauranteResponseDTO;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/restaurantes")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    @GetMapping
    public ResponseEntity<List<RestauranteResponseDTO>> listarRestaurantes() {
        List<RestauranteResponseDTO> restaurantes = restauranteService.listarRestaurantes()
            .stream()
            .map(restaurante -> new RestauranteResponseDTO(
                restaurante.getId(),
                restaurante.getNome(),
                restaurante.getNomeProprietario(),
                restaurante.getEmail(),
                restaurante.getEndereco(),
                restaurante.getTelefone(),
                restaurante.getDescricao(),
                restaurante.isAceitandoPedidos(),
                restaurante.getChavePix(),
                restaurante.getIngredientes(),
                restaurante.getListaDeItems(),
                restaurante.getMarmitas(),
                restaurante.getListaDePedidos()
            ))
            .toList();
            
        return ResponseEntity.ok(restaurantes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestauranteResponseDTO> buscarRestaurantePorId(@PathVariable UUID id) {
        Restaurante restaurante = restauranteService.buscarRestaurantePorId(id)
                .orElse(null);

        if (restaurante != null) {
            return ResponseEntity.ok(new RestauranteResponseDTO(
                restaurante.getId(),
                restaurante.getNome(),
                restaurante.getNomeProprietario(),
                restaurante.getEmail(),
                restaurante.getEndereco(),
                restaurante.getTelefone(),
                restaurante.getDescricao(),
                restaurante.isAceitandoPedidos(),
                restaurante.getChavePix(),
                restaurante.getIngredientes(),
                restaurante.getListaDeItems(),
                restaurante.getMarmitas(),
                restaurante.getListaDePedidos()
            ));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<RestauranteResponseDTO> buscarMeuPerfil() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante != null) {
            return ResponseEntity.ok(new RestauranteResponseDTO(
                restaurante.getId(),
                restaurante.getNome(),
                restaurante.getNomeProprietario(),
                restaurante.getEmail(),
                restaurante.getEndereco(),
                restaurante.getTelefone(),
                restaurante.getDescricao(),
                restaurante.isAceitandoPedidos(),
                restaurante.getChavePix(),
                restaurante.getIngredientes(),
                restaurante.getListaDeItems(),
                restaurante.getMarmitas(),
                restaurante.getListaDePedidos()
            ));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<RestauranteResponseDTO> atualizarPerfil(@RequestBody RestauranteDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restauranteExistente = restauranteService.buscarRestaurantePorEmail(email);

        if (restauranteExistente != null) {
            if (dto.getNome() != null) restauranteExistente.setNome(dto.getNome());
            if (dto.getEndereco() != null) restauranteExistente.setEndereco(dto.getEndereco());
            if (dto.getDescricao() != null) restauranteExistente.setDescricao(dto.getDescricao());
            if (dto.getAceitandoPedidos() != null) restauranteExistente.setAceitandoPedidos(dto.getAceitandoPedidos());
            if (dto.getChavePix() != null) restauranteExistente.setChavePix(dto.getChavePix());

            restauranteService.criarRestaurante(restauranteExistente);

            return ResponseEntity.ok(new RestauranteResponseDTO(
                restauranteExistente.getId(),
                restauranteExistente.getNome(),
                restauranteExistente.getNomeProprietario(),
                restauranteExistente.getEmail(),
                restauranteExistente.getEndereco(),
                restauranteExistente.getTelefone(),
                restauranteExistente.getDescricao(),
                restauranteExistente.isAceitandoPedidos(),
                restauranteExistente.getChavePix(),
                restauranteExistente.getIngredientes(),
                restauranteExistente.getListaDeItems(),
                restauranteExistente.getMarmitas(),
                restauranteExistente.getListaDePedidos()
            ));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRestaurante(@PathVariable UUID id) {
        restauranteService.deletarRestaurante(id);
        return ResponseEntity.noContent().build();
    }
}