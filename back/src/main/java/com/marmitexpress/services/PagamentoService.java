package com.marmitexpress.services;

import com.marmitexpress.models.Pagamento;
import com.marmitexpress.models.StatusPagamento;
import com.marmitexpress.repositorys.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public Pagamento criarPagamento(Double valor, String descricao) {
        Pagamento pagamento = new Pagamento(valor, descricao);
        return pagamentoRepository.save(pagamento);
    }

    public Pagamento atualizarStatusPagamento(UUID id, StatusPagamento status) {
        Pagamento pagamento = pagamentoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
        
        pagamento.setStatus(status);
        pagamento.setDataAtualizacao(LocalDateTime.now());
        return pagamentoRepository.save(pagamento);
    }

    public Pagamento buscarPagamentoPorId(UUID id) {
        return pagamentoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pagamento não encontrado"));
    }
}
