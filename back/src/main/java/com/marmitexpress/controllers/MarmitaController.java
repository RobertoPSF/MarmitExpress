package com.marmitexpress.controllers;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.services.MarmitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/marmitas")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")  // Injetando a variável de ambiente
public class MarmitaController {

    @Autowired
    private MarmitaService marmitaService;

    @PostMapping
    public ResponseEntity<Marmita> criarMarmita(@RequestBody Marmita marmita) {
        Marmita novaMarmita = marmitaService.criarMarmita(marmita);
        return ResponseEntity.ok(novaMarmita);
    }

    @GetMapping
    public ResponseEntity<List<Marmita>> listarMarmitas() {
        List<Marmita> marmitas = marmitaService.listarMarmitas();
        return ResponseEntity.ok(marmitas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marmita> buscarMarmitaPorId(@PathVariable Long id) {
        Optional<Marmita> marmita = marmitaService.buscarMarmitaPorId(id);
        return marmita.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMarmita(@PathVariable Long id) {
        marmitaService.deletarMarmita(id);
        return ResponseEntity.noContent().build();
    }
}