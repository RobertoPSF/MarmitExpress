package com.marmitexpress.dto;

import java.util.List;
public class ResumoPedidoDTO {
    public static class ItemResumo {
        public String nomeItem;
        public int quantidade;
        public double precoUnitario;
        public double subtotal;
        public List<String> ingredientes;
    }

    public Long idPedido;
    public String status;
    public String nomeCliente;
    public String enderecoEntrega;
    public List<ItemResumo> itens;
    public double precoTotal;
}
