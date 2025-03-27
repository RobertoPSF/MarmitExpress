package com.marmitexpress.services;

import com.marmitexpress.exceptions.PagamentoNotFoundException;
import com.marmitexpress.models.Pagamento;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.StatusPagamento;
import com.marmitexpress.repositorys.PagamentoRepository;
import com.marmitexpress.repositorys.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private QrCodeService qrCodeService;
    
    public Pagamento criarPagamento(String descricao, UUID idPedido) {
        Pedido pedido = pedidoRepository.findById(idPedido)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        Pagamento pagamento = new Pagamento();
        pagamento.setValor(pedido.getPreco());
        pagamento.setDescricao(descricao);
        pagamento.setPedido(pedido);
        pagamento.setStatus(StatusPagamento.PENDENTE);

        // Verificação mais segura do restaurante e chave Pix
        if (pedido.getRestaurante() != null && pedido.getRestaurante().getChavePix() != null) {
            String qrCode = gerarPayloadPix(pagamento);
            pagamento.setQrCode(qrCode);
            pagamento.setChavePix(pedido.getRestaurante().getChavePix());
        }

        return pagamentoRepository.save(pagamento);
    }

    public boolean confirmarPagamento(UUID id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
            .orElseThrow(() -> new PagamentoNotFoundException());

        if (pagamento.getStatus() == StatusPagamento.CONCLUIDO) {
            return false; // Já está confirmado
        }

        pagamento.setStatus(StatusPagamento.CONCLUIDO);
        pagamentoRepository.save(pagamento);
        return true;
    }

    public Pagamento buscarPagamentoPorId(UUID id) {
        return pagamentoRepository.findById(id)
            .orElseThrow(() -> new PagamentoNotFoundException());
    }

    public String gerarPayloadPix(Pagamento pagamento) {
        String chavePix = pagamento.getPedido().getRestaurante().getChavePix();
        String nomeRestaurante = pagamento.getPedido().getRestaurante().getNome();
        String cidadeRestaurante = "Campina Grande";
        double valor = pagamento.getValor();
        String txid = pagamento.getId().toString();

        // Chamando o serviço injetado corretamente
        return PixGeneratorService.gerarPayloadPix(chavePix, chavePix, valor, nomeRestaurante, cidadeRestaurante, txid);
    }

    public byte[] gerarQrCode(UUID pagamentoId) {
        Pagamento pagamento = buscarPagamentoPorId(pagamentoId);
        String payload = gerarPayloadPix(pagamento);
        return qrCodeService.generateQrCode(payload, 300, 300);
    }
}
