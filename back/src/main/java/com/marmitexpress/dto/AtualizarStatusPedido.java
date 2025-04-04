package com.marmitexpress.dto;

import java.util.UUID;

import com.marmitexpress.models.StatusPedido;

public class AtualizarStatusPedido {
    private StatusPedido status;

    public AtualizarStatusPedido() {}
    
    public AtualizarStatusPedido(UUID id, StatusPedido status) {
        this.status = status;
    }

    public StatusPedido getStatus() { return status; }
}

