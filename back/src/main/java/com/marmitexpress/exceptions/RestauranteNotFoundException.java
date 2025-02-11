package com.marmitexpress.exceptions;

public class RestauranteNotFoundException extends RuntimeException {
    public RestauranteNotFoundException(Long id) {
        super("Restaurante não encontrado.");
    }
}