package com.marmitexpress.services;

import com.marmitexpress.event.PagamentoConcluidoEvent;
import com.marmitexpress.models.Pagamento;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.StatusPagamento;
import com.marmitexpress.repositorys.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.marmitexpress.repositorys.PedidoRepository;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

     @Autowired
    private ApplicationEventPublisher eventPublisher;

    public Pagamento criarPagamento(Double valor, String descricao, UUID pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        Pagamento pagamento = new Pagamento(valor, descricao);
        pagamento.setPedido(pedido);
        
        return pagamentoRepository.save(pagamento);
    }

    public Pagamento atualizarStatusPagamento(UUID id, StatusPagamento status) {
        Pagamento pagamento = pagamentoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
        
        pagamento.setStatus(status);
        pagamento.setDataAtualizacao(LocalDateTime.now());
        pagamentoRepository.save(pagamento);

        if(status == StatusPagamento.CONCLUIDO) {
            eventPublisher.publishEvent(new PagamentoConcluidoEvent(this, pagamento.getPedido().getId(), pagamento.getId()));
        }

        return pagamento;
    }

    public Pagamento buscarPagamentoPorId(UUID id) {
        return pagamentoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
    }
}
