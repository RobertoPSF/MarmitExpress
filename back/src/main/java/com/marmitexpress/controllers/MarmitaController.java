package com.marmitexpress.controllers;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.services.MarmitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marmitas")
public class MarmitaController {

    @Autowired
    private MarmitaService marmitaService;

    // Criar uma nova marmita
    @PostMapping
    public ResponseEntity<Marmita> criarMarmita(@RequestBody Marmita marmita) {
        Marmita novaMarmita = marmitaService.criarMarmita(marmita);
        return new ResponseEntity<>(novaMarmita, HttpStatus.CREATED);
    }

    // Listar todas as marmitas
    @GetMapping
    public ResponseEntity<List<Marmita>> listarMarmitas() {
        List<Marmita> marmitas = marmitaService.listarMarmitas();
        return new ResponseEntity<>(marmitas, HttpStatus.OK);
    }

    // Buscar uma marmita por ID
    @GetMapping("/{id}")
    public ResponseEntity<Marmita> buscarMarmitaPorId(@PathVariable Long id) {
        Marmita marmita = marmitaService.buscarMarmitaPorId(id);
        if (marmita != null) {
            return new ResponseEntity<>(marmita, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Atualizar uma marmita
    @PutMapping("/{id}")
    public ResponseEntity<Marmita> atualizarMarmita(@PathVariable Long id, @RequestBody Marmita marmitaAtualizada) {
        Marmita marmita = marmitaService.atualizarMarmita(id, marmitaAtualizada);
        if (marmita != null) {
            return new ResponseEntity<>(marmita, HttpStatus.OK);
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
    public ResponseEntity<List<Marmita>> buscarMarmitasPorRestaurante(@PathVariable Long restauranteId) {
        List<Marmita> marmitas = marmitaService.buscarMarmitasPorRestaurante(restauranteId);
        return new ResponseEntity<>(marmitas, HttpStatus.OK);
    }
}