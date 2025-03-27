package com.marmitexpress.controllers;
import com.marmitexpress.models.*;
import com.marmitexpress.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
@RestController
@RequestMapping("/pagamentos")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "")
public class PagamentoController {

    @Autowired
    private  PagamentoService pagamentoService;
    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Pagamento> criarPagamento(
        @RequestParam String descricao,
        @RequestParam UUID idPedido) {
        Pagamento pagamento = pagamentoService.criarPagamento(descricao, idPedido);

        return ResponseEntity.ok(pagamento);
    }   

    @GetMapping("/{id}/qrcode")
    public ResponseEntity<Map<String, String>> obterPayloadPix(@PathVariable UUID id) {
        Pagamento pagamento = pagamentoService.buscarPagamentoPorId(id);
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

    @GetMapping("/{id}/status")
    public ResponseEntity<String> verificarStatusPagamento(@PathVariable UUID id) {

    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    
    Cliente cliente = clienteService.buscarClientePorEmail(email);
    if (cliente == null) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
    }

    Pagamento pagamento = pagamentoService.buscarPagamentoPorId(id);
    
    if (!pagamento.getPedido().getCliente().getId().equals(cliente.getId())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
    }
    return ResponseEntity.ok(pagamento.getStatus().toString());
    }
}
