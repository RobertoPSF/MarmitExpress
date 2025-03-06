package com.marmitexpress.controllers;

import com.marmitexpress.dto.MarmitaDTO;
import com.marmitexpress.dto.MarmitaResponseDTO;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.models.Marmita;
import com.marmitexpress.services.MarmitaService;
import com.marmitexpress.services.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/marmitas")
public class MarmitaController {

    @Autowired
    private MarmitaService marmitaService;

    @Autowired
    private RestauranteService restauranteService;

    @GetMapping("/listar/{restauranteId}")
    public ResponseEntity<List<MarmitaResponseDTO>> listarMarmitaByRestaurante(@PathVariable UUID restauranteId) {
        List<Marmita> marmitas = marmitaService.getMarmitasByRestaurante(restauranteId);
        List<MarmitaResponseDTO> marmitaResponseDTOs = marmitas.stream()
            .map(marmita -> new MarmitaResponseDTO(
                marmita.getId(),
                marmita.getNome(),
                marmita.getPreco(),
                marmita.getQuantidade(),
                marmita.getIngredientes(),
                marmita.getRestaurante().getId()
            ))
            .toList();
        return ResponseEntity.ok(marmitaResponseDTOs);
    }

    @PostMapping
    public ResponseEntity<MarmitaResponseDTO> criarMarmita(@RequestBody MarmitaDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Marmita novaMarmita = new Marmita();
        novaMarmita.setNome(dto.getNome());
        novaMarmita.setPreco(dto.getPreco());
        novaMarmita.setQuantidade(dto.getQuantidade());
        novaMarmita.setIngredientes(dto.getIngredientes());
        novaMarmita.setRestaurante(restaurante);

        Marmita marmitaSalva = marmitaService.criarMarmita(novaMarmita);

        return ResponseEntity.ok(new MarmitaResponseDTO(
            marmitaSalva.getId(),
            marmitaSalva.getNome(),
            marmitaSalva.getPreco(),
            marmitaSalva.getQuantidade(),
            marmitaSalva.getIngredientes(),
            marmitaSalva.getRestaurante().getId()
        ));
    }


    @GetMapping
    public ResponseEntity<List<MarmitaResponseDTO>> listarMarmitas() {
        List<Marmita> marmitas = marmitaService.listarMarmitas();
        List<MarmitaResponseDTO> marmitaResponseDTOs = marmitas.stream()
            .map(marmita -> new MarmitaResponseDTO(
                marmita.getId(),
                marmita.getNome(),
                marmita.getPreco(),
                marmita.getQuantidade(),
                marmita.getIngredientes(),
                marmita.getRestaurante().getId()
            ))
            .toList();
        return ResponseEntity.ok(marmitaResponseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarmitaResponseDTO> buscarMarmitaPorId(@PathVariable UUID id) { 

        Optional<Marmita> marmitaOpt = marmitaService.buscarMarmitaPorId(id);

        return marmitaOpt.map(marmita -> ResponseEntity.ok(new MarmitaResponseDTO(
            marmita.getId(),
            marmita.getNome(),
            marmita.getPreco(),
            marmita.getQuantidade(),
            marmita.getIngredientes(),
            marmita.getRestaurante().getId()
        ))).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarmitaResponseDTO> atualizarMarmita(@PathVariable UUID id, @RequestBody MarmitaDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Marmita> marmitaOpt = marmitaService.buscarMarmitaPorId(id);
        if (marmitaOpt.isEmpty() || !marmitaOpt.get().getRestaurante().getId().equals(restaurante.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Marmita marmitaAtualizada = new Marmita();
        marmitaAtualizada.setNome(dto.getNome());
        marmitaAtualizada.setPreco(dto.getPreco());
        marmitaAtualizada.setQuantidade(dto.getQuantidade());
        marmitaAtualizada.setIngredientes(dto.getIngredientes());
        marmitaAtualizada.setRestaurante(restaurante);

        Marmita marmitaSalva = marmitaService.atualizarMarmita(id, marmitaAtualizada);

        return ResponseEntity.ok(new MarmitaResponseDTO(
            marmitaSalva.getId(),
            marmitaSalva.getNome(),
            marmitaSalva.getPreco(),
            marmitaSalva.getQuantidade(),
            marmitaSalva.getIngredientes(),
            marmitaSalva.getRestaurante().getId()
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMarmita(@PathVariable UUID id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        if (restaurante == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<Marmita> marmitaOpt = marmitaService.buscarMarmitaPorId(id);
        if (marmitaOpt.isEmpty() || !marmitaOpt.get().getRestaurante().getId().equals(restaurante.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        marmitaService.deletarMarmita(id);
        return ResponseEntity.noContent().build();
    }
}
