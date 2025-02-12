package com.marmitexpress.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import com.marmitexpress.exceptions.AcessDeniedException;

@Component
public class VerificadorDeValor {
    private static final String VALOR_SALVO = System.getenv("VALOR_SECRETO");

    public static boolean validarSenha(String entrada) {
        if (VALOR_SALVO == null) {
            throw new IllegalStateException("A variável de ambiente VALOR_SECRETO não está definida.");
        }
        return VALOR_SALVO.equals(entrada);
    }
}
