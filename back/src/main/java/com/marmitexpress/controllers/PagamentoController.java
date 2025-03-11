package com.marmitexpress.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.marmitexpress.models.Pagamento;
import com.marmitexpress.repositorys.PagamentoRepository;
import com.marmitexpress.services.PagamentoService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/pagamentos")
public class PagamentoController {

    private final PagamentoService pagamentoService;
    private final PagamentoRepository pagamentoRepository;

    public PagamentoController(PagamentoService pagamentoService, PagamentoRepository pagamentoRepository) {
        this.pagamentoService = pagamentoService;
        this.pagamentoRepository = pagamentoRepository;
    }

    // JSON Payload
    @GetMapping("/{id}/qrcode")
public ResponseEntity<Map<String, String>> obterPayloadPix(@PathVariable UUID id) {
    Optional<Pagamento> pagamentoOpt = pagamentoRepository.findById(id);

    if (pagamentoOpt.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Pagamento pagamento = pagamentoOpt.get();
    String payloadPix = pagamentoService.gerarPayloadPix(pagamento);

    Map<String, String> response = new HashMap<>();
    response.put("payload", payloadPix);

    return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/confirmar")
    public ResponseEntity<String> confirmarPagamento(@PathVariable UUID id) {
        boolean confirmado = pagamentoService.confirmarPagamento(id);
        if (!confirmado) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pagamento não encontrado ou já confirmado.");
        }
        return ResponseEntity.ok("Pagamento confirmado com sucesso.");
    }
}
