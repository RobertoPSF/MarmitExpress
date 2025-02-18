package com.marmitexpress.exceptions;

public class AcessDeniedException extends RuntimeException {
    
    public AcessDeniedException() {
        super("Acesso negado.");
    }
    
}
