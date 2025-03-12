package com.marmitexpress.controllers;

import com.marmitexpress.dto.PedidoDTO;
import com.marmitexpress.dto.PedidoRequestDTO;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.repositorys.PedidoRepository;
import com.marmitexpress.repositorys.RestauranteRepository;
import com.marmitexpress.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private RestauranteRepository restauranteRepository;

    @Autowired
    private ClienteService clienteService;

    // Criar pedido (Cliente)
    @PostMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<?> criarPedido(@RequestBody PedidoRequestDTO pedidoRequest) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);

        var restauranteOpt = restauranteRepository.findById(pedidoRequest.getRestauranteId());
        if (restauranteOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Restaurante não encontrado.");
        }

        Pedido pedido = new Pedido(null, 0, null, null);
        pedido.setCliente(cliente);
        pedido.setRestaurante(restauranteOpt.get());

        Pedido novoPedido = pedidoRepository.save(pedido);
        return ResponseEntity.ok(new PedidoDTO(novoPedido));
    }

    // Cliente vê seus pedidos
    @GetMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<List<PedidoDTO>> listarPedidosCliente(@RequestHeader("Authorization") String token) {
        
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        
        List<Pedido> pedidos = pedidoRepository.findByCliente(cliente);
        List<PedidoDTO> pedidosDTO = pedidos.stream().map(PedidoDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(pedidosDTO);
    }

    // Restaurante/Admin busca pedido por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('RESTAURANTE', 'ADMIN')")
    public ResponseEntity<?> buscarPedido(@PathVariable UUID id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.map(p -> ResponseEntity.ok(new PedidoDTO(p))).orElseGet(() -> ResponseEntity.notFound().build());
    }


    // Cliente pode cancelar um pedido
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<?> cancelarPedido(@PathVariable UUID id, @RequestHeader("Authorization") String token) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        
        Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);

        if (pedidoOpt.isEmpty() || !pedidoOpt.get().getCliente().equals(cliente)) {
            return ResponseEntity.status(403).body("Você não tem permissão para cancelar este pedido.");
        }

        pedidoRepository.deleteById(id);
        return ResponseEntity.ok("Pedido cancelado.");
    }
}