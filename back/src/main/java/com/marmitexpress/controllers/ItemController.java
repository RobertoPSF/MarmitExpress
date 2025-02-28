package com.marmitexpress.controllers;

import com.marmitexpress.dto.ItemDTO;
import com.marmitexpress.dto.ItemResponseDTO;
import com.marmitexpress.models.Item;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.ItemService;
import com.marmitexpress.services.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
        Optional<Restaurante> restauranteOpt = restauranteService.buscarRestaurantePorId(dto.getRestauranteId());
        if (restauranteOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Restaurante restaurante = restauranteOpt.get();
        Item novoItem = new Item(dto.getNome(), dto.getPreco(), dto.getQuantidade(), restaurante);

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
        Optional<Item> itemOpt = itemService.buscarItemPorId(id);
        if (itemOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Item item = itemOpt.get();
        if (dto.getNome() != null) item.setNome(dto.getNome());
        if (dto.getPreco() != null) item.setPreco(dto.getPreco());
        if (dto.getQuantidade() != null) item.setQuantidade(dto.getQuantidade());

        itemService.atualizarItem(id, item);

        return ResponseEntity.ok(new ItemResponseDTO(
            item.getId(),
            item.getNome(),
            item.getPreco(),
            item.getQuantidade(),
            item.getRestaurante().getId()
        ));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarItem(@PathVariable UUID id) {
        itemService.deletarItem(id);
        return ResponseEntity.noContent().build();
    }
}