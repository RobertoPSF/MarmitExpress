package com.marmitexpress.exceptions;

public class MarmitaNotFoundException extends RuntimeException {
    public MarmitaNotFoundException() {
        super("Marmita não encontrada.");
    }
}