package com.marmitexpress.controllers;

import com.marmitexpress.exceptions.RestauranteNotFoundException;
import com.marmitexpress.exceptions.PedidoNotFoundException;
import com.marmitexpress.exceptions.MarmitaNotFoundException;
import com.marmitexpress.exceptions.ItemNotFoundException;
import com.marmitexpress.exceptions.AcessDeniedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RestauranteNotFoundException.class)
    public ResponseEntity<String> handleRestauranteNotFoundException(RestauranteNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PedidoNotFoundException.class)
    public ResponseEntity<String> handlePedidoNotFoundException(PedidoNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MarmitaNotFoundException.class)
    public ResponseEntity<String> handleMarmitaNotFoundException(MarmitaNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ItemNotFoundException.class)
    public ResponseEntity<String> handleItemNotFoundException(ItemNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AcessDeniedException.class)
    public ResponseEntity<String> handleAcessDeniedException(AcessDeniedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
    }
}