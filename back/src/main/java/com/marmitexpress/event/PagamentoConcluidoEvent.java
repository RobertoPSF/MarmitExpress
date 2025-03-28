package com.marmitexpress.event;

import java.util.UUID;

import org.springframework.context.ApplicationEvent;

public class PagamentoConcluidoEvent extends ApplicationEvent{
    private final UUID pedidoId;
    private final UUID pagamentoId;

    public PagamentoConcluidoEvent(Object source, UUID pedidoId, UUID pagamentoId) {
        super(source);
        this.pedidoId = pedidoId;
        this.pagamentoId = pagamentoId;
    }
    public UUID getPedidoId() {
        return pedidoId;
    }
    
    public UUID getPagamentoId() {
        return pagamentoId;
    }
}
