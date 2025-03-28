package com.marmitexpress.listener;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import com.marmitexpress.event.PagamentoConcluidoEvent;

@Service
public class RestauranteListener {

    @EventListener
    public void onPagamentoConfirmado(PagamentoConcluidoEvent event) {
        System.out.println("Restaurante foi notificado: Pedido " + event.getPedidoId() + " foi pago!");
        
        // Adicionar a lógica faltante 
    }
}
