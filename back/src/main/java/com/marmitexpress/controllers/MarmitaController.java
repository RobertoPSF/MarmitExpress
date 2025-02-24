package com.marmitexpress.controllers;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.security.Interceptor;
import com.marmitexpress.services.MarmitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/marmitas")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*") 
public class MarmitaController {

    @Autowired
    private Interceptor interceptor;

    @Autowired
    private MarmitaService marmitaService;

    @PostMapping
    public ResponseEntity<Marmita> criarMarmita(@RequestBody Marmita marmita, @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
        Marmita novaMarmita = marmitaService.criarMarmita(marmita);
        return ResponseEntity.ok(novaMarmita);
    }

    @GetMapping
    public ResponseEntity<List<Marmita>> listarMarmitas(@RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
        List<Marmita> marmitas = marmitaService.listarMarmitas();
        return ResponseEntity.ok(marmitas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marmita> buscarMarmitaPorId(@PathVariable Long id) {
        Optional<Marmita> marmita = marmitaService.buscarMarmitaPorId(id);
        return marmita.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMarmita(@PathVariable Long id, @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        if (interceptor.checkAuthorization(authorizationHeader)) {
            return ResponseEntity.status(401).body(null);
        }
        marmitaService.deletarMarmita(id);
        return ResponseEntity.noContent().build();
    }
}