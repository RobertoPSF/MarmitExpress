package com.marmitexpress.controllers;

import com.marmitexpress.dto.IngredienteDTO;
import com.marmitexpress.dto.IngredienteResponseDTO;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.IngredienteService;
import com.marmitexpress.services.RestauranteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ingredientes")
public class IngredienteController {

    @Autowired
    private IngredienteService ingredienteService;

    @Autowired
    private RestauranteService restauranteService;

    @PostMapping("/me")
    public ResponseEntity<IngredienteResponseDTO> createIngrediente(@RequestBody IngredienteDTO ingredienteDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(403).build();
        }

        IngredienteResponseDTO response = ingredienteService.createIngrediente(restaurante.getId(), ingredienteDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<List<IngredienteResponseDTO>> getMyIngredientes() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(403).build();
        }

        List<IngredienteResponseDTO> ingredientes = ingredienteService.getIngredientesByRestaurante(restaurante.getId());
        return ResponseEntity.ok(ingredientes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredienteResponseDTO> updateIngrediente(@PathVariable UUID id, @RequestBody IngredienteDTO ingredienteDTO) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(403).build();
        }

        IngredienteResponseDTO response = ingredienteService.updateIngrediente(id, restaurante.getId(), ingredienteDTO);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{restauranteId}")
    public ResponseEntity<List<IngredienteResponseDTO>> getIngredientesByRestaurante(@PathVariable UUID restauranteId) {
        List<IngredienteResponseDTO> ingredientes = ingredienteService.getIngredientesByRestaurante(restauranteId);
        return ResponseEntity.ok(ingredientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredienteResponseDTO> getIngredienteById(@PathVariable UUID id) {
        IngredienteResponseDTO response = ingredienteService.getIngredienteById(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngrediente(@PathVariable UUID id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ingredienteService.deleteIngrediente(id, restaurante.getId());
        return ResponseEntity.noContent().build();
    }

}
