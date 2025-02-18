package com.marmitexpress.exceptions;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException() {
        super("Item não encontrado.");
    }
}