package com.marmitexpress.controllers;

import com.marmitexpress.dto.MarmitaDTO;
import com.marmitexpress.dto.MarmitaResponseDTO;
import com.marmitexpress.models.Marmita;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.services.MarmitaService;
import com.marmitexpress.services.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/marmitas")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class MarmitaController {

    @Autowired
    private MarmitaService marmitaService;

    @Autowired
    private RestauranteService restauranteService;

    @PostMapping
    public ResponseEntity<MarmitaResponseDTO> criarMarmita(@RequestBody MarmitaDTO dto) {
        Optional<Restaurante> restauranteOpt = restauranteService.buscarRestaurantePorId(dto.getRestauranteId());
        if (restauranteOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Restaurante restaurante = restauranteOpt.get();
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
        List<MarmitaResponseDTO> marmitas = marmitaService.listarMarmitas().stream()
            .map(marmita -> new MarmitaResponseDTO(
                marmita.getId(),
                marmita.getNome(),
                marmita.getPreco(),
                marmita.getQuantidade(),
                marmita.getIngredientes(),
                marmita.getRestaurante().getId()
            ))
            .toList();

        return ResponseEntity.ok(marmitas);
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
        Optional<Marmita> marmitaOpt = marmitaService.buscarMarmitaPorId(id);
        if (marmitaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Marmita marmita = marmitaOpt.get();
        if (dto.getNome() != null) marmita.setNome(dto.getNome());
        if (dto.getPreco() != null) marmita.setPreco(dto.getPreco());
        if (dto.getQuantidade() != null) marmita.setQuantidade(dto.getQuantidade());
        if (dto.getIngredientes() != null) marmita.setIngredientes(dto.getIngredientes());

        marmitaService.atualizarMarmita(id, marmita);

        return ResponseEntity.ok(new MarmitaResponseDTO(
            marmita.getId(),
            marmita.getNome(),
            marmita.getPreco(),
            marmita.getQuantidade(),
            marmita.getIngredientes(),
            marmita.getRestaurante().getId()
        ));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMarmita(@PathVariable UUID id) {
        marmitaService.deletarMarmita(id);
        return ResponseEntity.noContent().build();
    }
}