package com.marmitexpress.controllers;

import com.marmitexpress.dto.PedidoDTO;
import com.marmitexpress.models.Marmita;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.Usuario;
import com.marmitexpress.services.MarmitaService;
import com.marmitexpress.services.PedidoService;
import com.marmitexpress.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;
    private UsuarioService usuarioService;
    private MarmitaService marmitaService;

    // Criar um novo pedido (RF-06)
    @PostMapping
    public ResponseEntity<PedidoDTO> criarPedido(@RequestBody PedidoDTO pedidoDTO) {
    // Busca o usuário pelo ID
    Usuario usuario = usuarioService.buscarUsuarioPorId(pedidoDTO.getUsuarioId());
    if (usuario == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Usuário não encontrado
    }

    // Busca a marmita pelo ID
    Marmita marmita = marmitaService.buscarMarmitaPorId(pedidoDTO.getMarmitaId());
    if (marmita == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Marmita não encontrada
    }

    // Cria a entidade Pedido a partir do DTO
    Pedido pedido = new Pedido();
    pedido.setUsuario(usuario); // Define o objeto Usuario
    pedido.setMarmita(marmita); // Define o objeto Marmita
    pedido.setQuantidade(pedidoDTO.getQuantidade());
    pedido.setValorTotal(pedidoDTO.getValorTotal());
    pedido.setStatus(pedidoDTO.getStatus());
    pedido.setDataPedido(pedidoDTO.getDataPedido());

    // Salva o pedido no banco de dados
    Pedido novoPedido = pedidoService.criarPedido(pedido);

    // Converte a entidade salva de volta para DTO
    PedidoDTO responseDTO = new PedidoDTO(
            novoPedido.getId(),
            novoPedido.getUsuario().getId(), // Acessa o ID do usuário
            novoPedido.getMarmita().getId(), // Acessa o ID da marmita
            novoPedido.getQuantidade(),
            novoPedido.getValorTotal(),
            novoPedido.getStatus(),
            novoPedido.getDataPedido()
    );

    return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
}

    // Listar todos os pedidos (RF-07)
    @GetMapping
    public ResponseEntity<List<PedidoDTO>> listarPedidos() {
        // Busca todos os pedidos no banco de dados
        List<Pedido> pedidos = pedidoService.listarPedidos();

        // Converte a lista de entidades para DTOs
        List<PedidoDTO> pedidosDTO = pedidos.stream()
                .map(pedido -> new PedidoDTO(
                        pedido.getId(),
                        pedido.getUsuario().getId(),
                        pedido.getMarmita().getId(),
                        pedido.getQuantidade(),
                        pedido.getValorTotal(),
                        pedido.getStatus(),
                        pedido.getDataPedido()
                ))
                .collect(Collectors.toList());

        return new ResponseEntity<>(pedidosDTO, HttpStatus.OK);
    }

    // Buscar um pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> buscarPedidoPorId(@PathVariable Long id) {
        // Busca o pedido pelo ID
        Pedido pedido = pedidoService.buscarPedidoPorId(id);

        if (pedido != null) {
            // Converte a entidade para DTO
            PedidoDTO pedidoDTO = new PedidoDTO(
                    pedido.getId(),
                    pedido.getUsuario().getId(),
                    pedido.getMarmita().getId(),
                    pedido.getQuantidade(),
                    pedido.getValorTotal(),
                    pedido.getStatus(),
                    pedido.getDataPedido()
            );
            return new ResponseEntity<>(pedidoDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Buscar pedidos por usuário (RF-07)
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PedidoDTO>> buscarPedidosPorUsuario(@PathVariable Long usuarioId) {
    // Busca os pedidos por usuário
        List<Pedido> pedidos = pedidoService.buscarPedidosPorUsuario(usuarioId);

    // Converte a lista de entidades para DTOs
        List<PedidoDTO> pedidosDTO = pedidos.stream()
                .map(pedido -> new PedidoDTO(
                        pedido.getId(),
                        pedido.getUsuario().getId(),
                        pedido.getMarmita().getId(),
                        pedido.getQuantidade(),
                        pedido.getValorTotal(),
                        pedido.getStatus(),
                        pedido.getDataPedido()
                ))
                .collect(Collectors.toList());

        return new ResponseEntity<>(pedidosDTO, HttpStatus.OK);
    }

    // Atualizar o status de um pedido (RF-08)
    @PutMapping("/{id}/status")
    public ResponseEntity<PedidoDTO> atualizarStatusPedido(@PathVariable Long id, @RequestParam String status) {
        // Atualiza o status do pedido
        Pedido pedidoAtualizado = pedidoService.atualizarStatusPedido(id, status);

        if (pedidoAtualizado != null) {
            // Converte a entidade atualizada para DTO
            PedidoDTO pedidoDTO = new PedidoDTO(
                    pedidoAtualizado.getId(),
                    pedidoAtualizado.getUsuario().getId(),
                    pedidoAtualizado.getMarmita().getId(),
                    pedidoAtualizado.getQuantidade(),
                    pedidoAtualizado.getValorTotal(),
                    pedidoAtualizado.getStatus(),
                    pedidoAtualizado.getDataPedido()
            );
            return new ResponseEntity<>(pedidoDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Cancelar um pedido (RF-08)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarPedido(@PathVariable Long id) {
        // Cancela o pedido
        pedidoService.cancelarPedido(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Comprar marmita (RF-09)
    @PostMapping("/comprar")
    public ResponseEntity<PedidoDTO> comprarMarmita(@RequestBody PedidoDTO pedidoDTO) {
    // Busca o usuário pelo ID
    Usuario usuario = usuarioService.buscarUsuarioPorId(pedidoDTO.getUsuarioId());
    if (usuario == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Usuário não encontrado
    }

    // Busca a marmita pelo ID
    Marmita marmita = marmitaService.buscarMarmitaPorId(pedidoDTO.getMarmitaId());
    if (marmita == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Marmita não encontrada
    }

    // Cria a entidade Pedido a partir do DTO
    Pedido pedido = new Pedido();
    pedido.setUsuario(usuario); // Define o objeto Usuario
    pedido.setMarmita(marmita); // Define o objeto Marmita
    pedido.setQuantidade(pedidoDTO.getQuantidade());
    pedido.setValorTotal(pedidoDTO.getValorTotal());
    pedido.setStatus(pedidoDTO.getStatus());
    pedido.setDataPedido(pedidoDTO.getDataPedido());

    // Cria o pedido no banco de dados
    Pedido novoPedido = pedidoService.criarPedido(pedido);

    // Converte a entidade salva de volta para DTO
    PedidoDTO responseDTO = new PedidoDTO(
            novoPedido.getId(),
            novoPedido.getUsuario().getId(), // Acessa o ID do usuário
            novoPedido.getMarmita().getId(), // Acessa o ID da marmita
            novoPedido.getQuantidade(),
            novoPedido.getValorTotal(),
            novoPedido.getStatus(),
            novoPedido.getDataPedido()
    );

    return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }
}