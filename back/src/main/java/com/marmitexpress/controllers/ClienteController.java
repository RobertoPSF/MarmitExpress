package com.marmitexpress.controllers;

import com.marmitexpress.dto.ClienteDTO;
import com.marmitexpress.dto.ClienteResponseDTO;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.models.Pagamento;
import com.marmitexpress.services.ClienteService;
import com.marmitexpress.services.PagamentoService;
import com.marmitexpress.services.QrCodeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;
    
    @Autowired
    private PagamentoService pagamentoService;
    
    @Autowired
    private QrCodeService qrCodeService;

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listarClientes() {
        List<ClienteResponseDTO> clientes = clienteService.listarClientes()
            .stream()
            .map(cliente -> new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getEndereco(),
                cliente.getTelefone()
            ))
            .toList();
        
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/me")
    public ResponseEntity<ClienteResponseDTO> buscarMeuPerfil() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);

        if (cliente != null) {
            return ResponseEntity.ok(new ClienteResponseDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getEndereco(),
                cliente.getTelefone()
            ));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<ClienteResponseDTO> atualizarPerfil(@RequestBody ClienteDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente clienteExistente = clienteService.buscarClientePorEmail(email);

        if (clienteExistente != null) {
            if (dto.getNome() != null) clienteExistente.setNome(dto.getNome());
            if (dto.getEndereco() != null) clienteExistente.setEndereco(dto.getEndereco());
            if (dto.getTelefone() != null) clienteExistente.setTelefone(dto.getTelefone());

            clienteService.criarCliente(clienteExistente);

            return ResponseEntity.ok(new ClienteResponseDTO(
                clienteExistente.getId(),
                clienteExistente.getNome(),
                clienteExistente.getEmail(),
                clienteExistente.getEndereco(),
                clienteExistente.getTelefone()
            ));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable UUID id) {
        clienteService.deletarCliente(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/pagamentos")
    public ResponseEntity<Pagamento> criarPagamento(@RequestParam Double valor, 
                                                    @RequestParam String descricao) {
        Pagamento pagamento = pagamentoService.criarPagamento(valor, descricao);
        return ResponseEntity.ok(pagamento);
    }

    @GetMapping("/pagamentos/{id}/qr-code")
    public ResponseEntity<byte[]> gerarQrCode(@PathVariable UUID id) {
        Pagamento pagamento = pagamentoService.buscarPagamentoPorId(id);
        String chavePix = pagamento.getPedido().getRestaurante().getChavePix();
        String dadosPagamento = String.format("marmitexpress://pagamento/%d?valor=%.2f&chave=%s", 
            id, pagamento.getValor(), chavePix);
            
        String qrCodeBase64 = qrCodeService.generateQrCode(dadosPagamento, 300, 300);
        byte[] qrCodeImage = Base64.getDecoder().decode(qrCodeBase64.split(",")[1]);
        
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(qrCodeImage);
    }

    @GetMapping("/pagamentos/{id}/status")
    public ResponseEntity<String> verificarStatusPagamento(@PathVariable UUID id) {
        Pagamento pagamento = pagamentoService.buscarPagamentoPorId(id);
        return ResponseEntity.ok(pagamento.getStatus().toString());
    }
}
