package com.marmitexpress.controllers;

import com.marmitexpress.dto.ItemDTO;
import com.marmitexpress.dto.ItemResponseDTO;
import com.marmitexpress.models.Item;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.ItemService;
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
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private RestauranteService restauranteService;

    @PostMapping
    public ResponseEntity<ItemResponseDTO> criarItem(@RequestBody ItemDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Item novoItem = new Item(null, dto.getNome(), dto.getPreco(), dto.getQuantidade(), null, restaurante);

        Item itemSalvo = itemService.criarItem(novoItem);

        return ResponseEntity.ok(new ItemResponseDTO(
            itemSalvo.getId(),
            itemSalvo.getNome(),
            itemSalvo.getPreco(),
            itemSalvo.getQuantidade(),
            itemSalvo.getRestaurante().getId()
        ));
    }


    @GetMapping
    public ResponseEntity<List<ItemResponseDTO>> listarItens() {
        List<ItemResponseDTO> itens = itemService.listarItens().stream()
            .map(item -> new ItemResponseDTO(
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
    public ResponseEntity<ItemResponseDTO> buscarItemPorId(@PathVariable UUID id) {
        Optional<Item> itemOpt = itemService.buscarItemPorId(id);

        return itemOpt.map(item -> ResponseEntity.ok(new ItemResponseDTO(
            item.getId(),
            item.getNome(),
            item.getPreco(),
            item.getQuantidade(),
            item.getRestaurante().getId()
        ))).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponseDTO> atualizarItem(@PathVariable UUID id, @RequestBody ItemDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Item> itemOpt = itemService.buscarItemPorId(id);
        if (itemOpt.isEmpty() || !itemOpt.get().getRestaurante().getId().equals(restaurante.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Item itemAtualizado = new Item(id, dto.getNome(), dto.getPreco(), dto.getQuantidade(), null, restaurante);
        Item itemSalvo = itemService.atualizarItem(id, itemAtualizado);

        return ResponseEntity.ok(new ItemResponseDTO(
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

        Optional<Item> itemOpt = itemService.buscarItemPorId(id);
        if (itemOpt.isEmpty() || !itemOpt.get().getRestaurante().getId().equals(restaurante.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        itemService.deletarItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/restaurante/{restauranteiId}")
    public ResponseEntity<List<ItemResponseDTO>> buscarItensPorRestaurante() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<Item> itens = itemService.buscarItensPorRestaurante(restaurante);

        List<ItemResponseDTO> itemResponseDTOs = itens.stream()
            .map(item -> new ItemResponseDTO(
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