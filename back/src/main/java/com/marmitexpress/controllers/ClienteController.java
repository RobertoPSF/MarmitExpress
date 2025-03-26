package com.marmitexpress.controllers;

import com.marmitexpress.dto.ClienteDTO;
import com.marmitexpress.dto.ClienteResponseDTO;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.models.Pagamento;
import com.marmitexpress.services.ClienteService;
import com.marmitexpress.services.PagamentoService;
import com.marmitexpress.services.QrCodeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Pagamento> criarPagamento(
        @RequestParam String descricao,
        @RequestParam UUID idPedido) {
        Pagamento pagamento = pagamentoService.criarPagamento(descricao, idPedido);

    return ResponseEntity.ok(pagamento);
}

    @GetMapping("/pagamentos/{id}/qr-code")
    public ResponseEntity<byte[]> gerarQrCode(@PathVariable UUID id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        if (cliente == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        Pagamento pagamento = pagamentoService.buscarPagamentoPorId(id);
        if (!pagamento.getPedido().getCliente().getId().equals(cliente.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        String payloadPix = pagamentoService.gerarPayloadPix(pagamento);
        byte[] qrCodeImage = qrCodeService.generateQrCode(payloadPix, 300, 300);

        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_PNG)
            .body(qrCodeImage);
    }

    @GetMapping("/pagamentos/{id}/status")
    public ResponseEntity<String> verificarStatusPagamento(@PathVariable UUID id) {
    // Recupera o e-mail do usuário autenticado
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    
    // Busca o cliente logado
    Cliente cliente = clienteService.buscarClientePorEmail(email);
    if (cliente == null) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
    }

    // Busca o pagamento
    Pagamento pagamento = pagamentoService.buscarPagamentoPorId(id);
    
    // Verifica se o pagamento pertence ao cliente autenticado
    if (!pagamento.getPedido().getCliente().getId().equals(cliente.getId())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado.");
    }
    return ResponseEntity.ok(pagamento.getStatus().toString());
    }
}
