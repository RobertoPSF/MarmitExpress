package com.marmitexpress.controllers;

import com.marmitexpress.dto.PedidoResponseDTO;
import com.marmitexpress.dto.ResumoPedidoDTO;
import com.marmitexpress.dto.AtualizarStatusPedido;
import com.marmitexpress.dto.PedidoDTO;
import com.marmitexpress.models.*;
import com.marmitexpress.repositorys.*;
import com.marmitexpress.services.ClienteService;
import com.marmitexpress.services.PedidoService;
import com.marmitexpress.services.RestauranteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteService clienteService;
    
    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private RestauranteService restauranteService;

    @PostMapping
    public ResponseEntity<?> criarPedido(@RequestBody PedidoDTO pedidoRequest) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        try {
            Pedido pedido = pedidoService.criarPedido(pedidoRequest, cliente);
            return ResponseEntity.ok(pedido);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Cliente vê seus pedidos
    @GetMapping("/cliente")
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidosCliente(@RequestHeader("Authorization") String token) {
        
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        
        List<Pedido> pedidos = pedidoRepository.findByCliente(cliente);
        List<PedidoResponseDTO> pedidosDTO = pedidos.stream().map(PedidoResponseDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok(pedidosDTO);
    }

    // Restaurante/Admin busca pedido por ID
    @GetMapping("/{id}")
    //@PreAuthorize("hasAnyRole('RESTAURANTE', 'ADMIN')")
    public ResponseEntity<?> buscarPedido(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoRepository.findById(id);
        return pedido.map(p -> ResponseEntity.ok(new PedidoResponseDTO(p))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Cliente pode cancelar um pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelarPedido(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        
        Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);

        if (pedidoOpt.isEmpty() || !pedidoOpt.get().getCliente().equals(cliente)) {
            return ResponseEntity.status(403).body("Você não tem permissão para cancelar este pedido.");
        }

        pedidoRepository.deleteById(id);
        return ResponseEntity.ok("Pedido cancelado.");
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatusPedido(@PathVariable Long id, @RequestBody AtualizarStatusPedido novoStatus) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Restaurante restauranteExistente = restauranteService.buscarRestaurantePorEmail(email);

        if (restauranteExistente != null) {
            Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);

            if (pedidoOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Pedido pedido = pedidoOpt.get();
            pedido.setStatus(novoStatus.getStatus());
            pedidoRepository.save(pedido);

            return ResponseEntity.ok(new PedidoResponseDTO(pedido));
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/entregar")
    public ResponseEntity<?> marcarPedidoComoEntregue(@PathVariable Long id) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);

        if (cliente != null) {
            Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);

            if (pedidoOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Pedido pedido = pedidoOpt.get();
            pedido.setStatus(StatusPedido.ENTREGUE);
            pedidoRepository.save(pedido);

            return ResponseEntity.ok(new PedidoResponseDTO(pedido));
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/resumo")
    public ResponseEntity<?> getResumoPedido(@PathVariable Long id){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Cliente cliente = clienteService.buscarClientePorEmail(email);
        Restaurante restaurante = restauranteService.buscarRestaurantePorEmail(email);

        Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);
        if (pedidoOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Pedido não encontrado.");
        }
        Pedido pedido = pedidoOpt.get();
        boolean isCliente = cliente != null && pedido.getCliente().equals(cliente);
        boolean isRestaurante = restaurante != null && pedido.getRestaurante().equals(restaurante);
        if (!isCliente && !isRestaurante) {
            return ResponseEntity.status(403).body("Você não tem permissão para ver este resumo de pedido.");
        }

        ResumoPedidoDTO resumo = pedidoService.gerarResumoPedido(id);
        return ResponseEntity.ok(resumo);
    }

}
