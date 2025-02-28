package com.marmitexpress.exceptions;

public class RestauranteNotFoundException extends RuntimeException {
    public RestauranteNotFoundException() {
        super("Restaurante não encontrado.");
    }
}