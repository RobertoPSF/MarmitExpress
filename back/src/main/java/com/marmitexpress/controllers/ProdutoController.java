package com.marmitexpress.controllers;

import com.marmitexpress.dto.ProdutoDTO;
import com.marmitexpress.dto.ProdutoResponseDTO;
import com.marmitexpress.models.Produto;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.ProdutoService;
import com.marmitexpress.services.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/itens")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService itemService;

    @Autowired
    private RestauranteService restauranteService;

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criarItem(@RequestBody ProdutoDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Produto novoItem = new Produto(null, dto.getNome(), dto.getPreco(), dto.getQuantidade(), null, restaurante);

        Produto itemSalvo = itemService.criarItem(novoItem);

        return ResponseEntity.ok(new ProdutoResponseDTO(
            itemSalvo.getId(),
            itemSalvo.getNome(),
            itemSalvo.getPreco(),
            itemSalvo.getQuantidade(),
            itemSalvo.getRestaurante().getId()
        ));
    }


    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listarItens() {
        List<ProdutoResponseDTO> itens = itemService.listarItens().stream()
            .map(item -> new ProdutoResponseDTO(
                item.getId(),
                item.getNome(),
                item.getPreco(),
                item.getQuantidade(),
                item.getRestaurante().getId()
            ))
            .toList();

        return ResponseEntity.ok(itens);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarItemPorId(@PathVariable UUID id) {
        Optional<Produto> itemOpt = itemService.buscarItemPorId(id);

        return itemOpt.map(item -> ResponseEntity.ok(new ProdutoResponseDTO(
            item.getId(),
            item.getNome(),
            item.getPreco(),
            item.getQuantidade(),
            item.getRestaurante().getId()
        ))).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizarItem(@PathVariable UUID id, @RequestBody ProdutoDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Produto> itemOpt = itemService.buscarItemPorId(id);
        if (itemOpt.isEmpty() || !itemOpt.get().getRestaurante().getId().equals(restaurante.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Produto itemAtualizado = new Produto(id, dto.getNome(), dto.getPreco(), dto.getQuantidade(), null, restaurante);
        Produto itemSalvo = itemService.atualizarItem(id, itemAtualizado);

        return ResponseEntity.ok(new ProdutoResponseDTO(
            itemSalvo.getId(),
            itemSalvo.getNome(),
            itemSalvo.getPreco(),
            itemSalvo.getQuantidade(),
            itemSalvo.getRestaurante().getId()
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarItem(@PathVariable UUID id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Produto> itemOpt = itemService.buscarItemPorId(id);
        if (itemOpt.isEmpty() || !itemOpt.get().getRestaurante().getId().equals(restaurante.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        itemService.deletarItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/restaurante/{restauranteiId}")
    public ResponseEntity<List<ProdutoResponseDTO>> buscarItensPorRestaurante() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<Produto> itens = itemService.buscarItensPorRestaurante(restaurante);

        List<ProdutoResponseDTO> itemResponseDTOs = itens.stream()
            .map(item -> new ProdutoResponseDTO(
                item.getId(),
                item.getNome(),
                item.getPreco(),
                item.getQuantidade(),
                item.getRestaurante().getId()
            ))
            .collect(Collectors.toList());

        return ResponseEntity.ok(itemResponseDTOs);
    }


}