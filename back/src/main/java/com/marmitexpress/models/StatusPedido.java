package com.marmitexpress.models;

public enum StatusPedido {
    PENDENTE, // Pedido criado, mas ainda não pago
    EM_PREPARO, // Pagamento confirmado, restaurante preparando
    PRONTO, // Pedido pronto para entrega
    A_CAMINHO, // Saiu para entrega
    ENTREGUE // Cliente recebeu
}
