package com.marmitexpress.services;

import com.marmitexpress.exceptions.PagamentoNotFoundException;
import com.marmitexpress.models.Pagamento;
import com.marmitexpress.models.Pedido;
import com.marmitexpress.models.StatusPagamento;
import com.marmitexpress.repositorys.PagamentoRepository;
import com.marmitexpress.repositorys.PedidoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private QrCodeService qrCodeService;
    
    public Pagamento criarPagamento(String descricao, Long idPedido) {
        Pedido pedido = pedidoRepository.findById(idPedido)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    
        Pagamento pagamento = new Pagamento();
        pagamento.setValor(pedido.getPreco());
        pagamento.setDescricao(descricao);
        pagamento.setPedido(pedido);
        pagamento.setStatus(StatusPagamento.PENDENTE);
    
        // Primeiro persiste o pagamento para gerar o ID
        pagamento = pagamentoRepository.save(pagamento);
    
        // Verificação do restaurante e chave Pix
        if (pedido.getRestaurante() != null && pedido.getRestaurante().getChavePix() != null) {
            String qrCode = gerarPayloadPix(pagamento);
            pagamento.setQrCode(qrCode);
            pagamento.setChavePix(pedido.getRestaurante().getChavePix());
            
            // Atualiza o pagamento com o QR Code e a chave Pix
            pagamento = pagamentoRepository.save(pagamento);
        }
    
        return pagamento;
    }
    

    public boolean confirmarPagamento(Long id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
            .orElseThrow(() -> new PagamentoNotFoundException());

        if (pagamento.getStatus() == StatusPagamento.CONCLUIDO) {
            return false; // Já está confirmado
        }

        pagamento.setStatus(StatusPagamento.CONCLUIDO);
        pagamentoRepository.save(pagamento);
        return true;
    }

    public Pagamento buscarPagamentoPorId(Long id) {
        return pagamentoRepository.findById(id)
            .orElseThrow(() -> new PagamentoNotFoundException());
    }

    public String gerarPayloadPix(Pagamento pagamento) {
        String chavePix = pagamento.getPedido().getRestaurante().getChavePix();
        String nomeProprietario = pagamento.getPedido().getRestaurante().getNomeProprietario().toUpperCase();
        String cidadeRestaurante = "CAMPINA GRANDE";
        double valor = pagamento.getValor();
        String txid = pagamento.getId().toString();
        String descricao = "Pedido #" + pagamento.getPedido().getId();
    
        return PixGeneratorService.gerarPayloadPix(chavePix, valor, nomeProprietario, cidadeRestaurante, txid, descricao);
    }
    

    public byte[] gerarQrCode(Long pagamentoId) {
        Pagamento pagamento = buscarPagamentoPorId(pagamentoId);
        String payload = gerarPayloadPix(pagamento);
        return qrCodeService.generateQrCode(payload, 300, 300);
    }
}
