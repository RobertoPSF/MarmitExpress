package com.marmitexpress.services;

import com.marmitexpress.exceptions.PagamentoNotFoundException;
import com.marmitexpress.models.Pagamento;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.StatusPagamento;
import com.marmitexpress.repositorys.PagamentoRepository;
import com.marmitexpress.repositorys.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoRepository pagamentoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    public String gerarPayloadPix(Pagamento pagamento) {
        String chavePix = pagamento.getPedido().getRestaurante().getChavePix();
        String nomeRestaurante = pagamento.getPedido().getRestaurante().getNome();
        String cidadeRestaurante = "Campina Grande";
        double valor = pagamento.getValor();
        String txid = pagamento.getId().toString();

        return PixGeneratorService.gerarPayloadPix(chavePix, chavePix, valor, nomeRestaurante, cidadeRestaurante, txid);
    }

    public Pagamento buscarPagamentoPorId(UUID id) {
        return pagamentoRepository.findById(id)
            .orElseThrow(() -> new PagamentoNotFoundException());
    }
    
    public Pagamento criarPagamento(Double valor, String descricao, UUID idPedido) {
    Pedido pedido = pedidoRepository.findById(idPedido)
        .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

    Pagamento pagamento = new Pagamento();
    pagamento.setValor(valor);
    pagamento.setDescricao(descricao);
    pagamento.setPedido(pedido);
    pagamento.setStatus(StatusPagamento.PENDENTE); // Definir como pendente inicialmente

    return pagamentoRepository.save(pagamento);
    }

    public boolean confirmarPagamento(UUID id) {
        Optional<Pagamento> pagamentoOpt = pagamentoRepository.findById(id);
        if (pagamentoOpt.isEmpty()) {
            return false; // Retorna falso se o pagamento não existir
        }

        Pagamento pagamento = pagamentoOpt.get();
        if (pagamento.getStatus() == StatusPagamento.CONCLUIDO) {
            return false; // Retorna falso se já estiver confirmado
        }

        pagamento.setStatus(StatusPagamento.CONCLUIDO);
        pagamentoRepository.save(pagamento);
        return true;
    }

}
