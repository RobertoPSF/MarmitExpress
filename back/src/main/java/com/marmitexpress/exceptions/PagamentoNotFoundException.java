package com.marmitexpress.exceptions;

public class PagamentoNotFoundException extends RuntimeException {
    public PagamentoNotFoundException() {
        super("Pagamento não encontrado.");
    }
}
