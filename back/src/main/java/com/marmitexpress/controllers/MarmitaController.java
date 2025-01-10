package com.marmitexpress.controllers;

import com.marmitexpress.dto.MarmitaDTO;
import com.marmitexpress.models.Marmita;
import com.marmitexpress.services.MarmitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/marmitas")
public class MarmitaController {

    @Autowired
    private MarmitaService marmitaService;

    // Criar uma nova marmita
    @PostMapping
    public ResponseEntity<MarmitaDTO> criarMarmita(@RequestBody MarmitaDTO marmitaDTO) {
        // Converter DTO para entidade
        Marmita marmita = new Marmita();
        marmita.setNome(marmitaDTO.getNome());
        marmita.setDescricao(marmitaDTO.getDescricao());
        marmita.setPreco(marmitaDTO.getPreco());

        // Salvar no banco de dados
        Marmita novaMarmita = marmitaService.criarMarmita(marmita);

        // Converter entidade para DTO
        MarmitaDTO responseDTO = new MarmitaDTO();
        responseDTO.setId(novaMarmita.getId());
        responseDTO.setNome(novaMarmita.getNome());
        responseDTO.setDescricao(novaMarmita.getDescricao());
        responseDTO.setPreco(novaMarmita.getPreco());
        responseDTO.setRestauranteId(novaMarmita.getRestaurante().getId()); // Assumindo que a entidade Marmita tem um relacionamento com Restaurante

        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    // Listar todas as marmitas
    @GetMapping
    public ResponseEntity<List<MarmitaDTO>> listarMarmitas() {
        List<Marmita> marmitas = marmitaService.listarMarmitas();

        // Converter lista de entidades para lista de DTOs
        List<MarmitaDTO> marmitasDTO = marmitas.stream()
                .map(marmita -> {
                    MarmitaDTO dto = new MarmitaDTO();
                    dto.setId(marmita.getId());
                    dto.setNome(marmita.getNome());
                    dto.setDescricao(marmita.getDescricao());
                    dto.setPreco(marmita.getPreco());
                    dto.setRestauranteId(marmita.getRestaurante().getId()); // Assumindo que a entidade Marmita tem um relacionamento com Restaurante
                    return dto;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(marmitasDTO, HttpStatus.OK);
    }

    // Buscar uma marmita por ID
    @GetMapping("/{id}")
    public ResponseEntity<MarmitaDTO> buscarMarmitaPorId(@PathVariable Long id) {
        Marmita marmita = marmitaService.buscarMarmitaPorId(id);

        if (marmita != null) {
            // Converter entidade para DTO
            MarmitaDTO responseDTO = new MarmitaDTO();
            responseDTO.setId(marmita.getId());
            responseDTO.setNome(marmita.getNome());
            responseDTO.setDescricao(marmita.getDescricao());
            responseDTO.setPreco(marmita.getPreco());
            responseDTO.setRestauranteId(marmita.getRestaurante().getId()); // Assumindo que a entidade Marmita tem um relacionamento com Restaurante

            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Atualizar uma marmita
    @PutMapping("/{id}")
    public ResponseEntity<MarmitaDTO> atualizarMarmita(@PathVariable Long id, @RequestBody MarmitaDTO marmitaDTO) {
        Marmita marmitaAtualizada = new Marmita();
        marmitaAtualizada.setNome(marmitaDTO.getNome());
        marmitaAtualizada.setDescricao(marmitaDTO.getDescricao());
        marmitaAtualizada.setPreco(marmitaDTO.getPreco());

        // Atualizar no banco de dados
        Marmita marmita = marmitaService.atualizarMarmita(id, marmitaAtualizada);

        if (marmita != null) {
            // Converter entidade para DTO
            MarmitaDTO responseDTO = new MarmitaDTO();
            responseDTO.setId(marmita.getId());
            responseDTO.setNome(marmita.getNome());
            responseDTO.setDescricao(marmita.getDescricao());
            responseDTO.setPreco(marmita.getPreco());
            responseDTO.setRestauranteId(marmita.getRestaurante().getId()); // Assumindo que a entidade Marmita tem um relacionamento com Restaurante

            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Deletar uma marmita
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMarmita(@PathVariable Long id) {
        marmitaService.deletarMarmita(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Buscar marmitas por restaurante
    @GetMapping("/restaurante/{restauranteId}")
    public ResponseEntity<List<MarmitaDTO>> buscarMarmitasPorRestaurante(@PathVariable Long restauranteId) {
        List<Marmita> marmitas = marmitaService.buscarMarmitasPorRestaurante(restauranteId);

        // Converter lista de entidades para lista de DTOs
        List<MarmitaDTO> marmitasDTO = marmitas.stream()
                .map(marmita -> {
                    MarmitaDTO dto = new MarmitaDTO();
                    dto.setId(marmita.getId());
                    dto.setNome(marmita.getNome());
                    dto.setDescricao(marmita.getDescricao());
                    dto.setPreco(marmita.getPreco());
                    dto.setRestauranteId(marmita.getRestaurante().getId()); // Assumindo que a entidade Marmita tem um relacionamento com Restaurante
                    return dto;
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(marmitasDTO, HttpStatus.OK);
    }
}