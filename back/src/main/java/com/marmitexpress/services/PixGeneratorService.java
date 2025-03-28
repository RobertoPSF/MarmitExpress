package com.marmitexpress.services;

import java.util.Locale;

public class PixGeneratorService {

    public static String gerarPayloadPix(String chavePix, double valor,
                                         String nomeReceptor, String cidadeReceptor, String codigoPagamento) {
        String payload = "000201";

        // Merchant Account Information (tag 26)
        String merchantAccountInfo = formatarCampo("00", "br.gov.bcb.pix");
        merchantAccountInfo += formatarCampo("01", chavePix);
        merchantAccountInfo += formatarCampo("02", "marmitexpress"); // Nome fixo da cobrança

        // Corrigindo a Tag 26 para ter o comprimento correto
        payload += formatarCampo("26", merchantAccountInfo);

        // Outros campos fixos do Pix
        payload += formatarCampo("52", "0000");
        payload += formatarCampo("53", "986");

        // Garantia de que o valor sempre terá ponto decimal
        String valorFormatado = String.format(Locale.US, "%.2f", valor);
        payload += formatarCampo("54", valorFormatado);

        payload += formatarCampo("58", "BR");
        payload += formatarCampo("59", nomeReceptor.toUpperCase());
        payload += formatarCampo("60", cidadeReceptor);

        // Additional Data Field Template (tag 62) - TxID corretamente formatado
        if (codigoPagamento != null && !codigoPagamento.isEmpty()) {
            payload += formatarCampo("62", formatarCampo("05", codigoPagamento.substring(0, Math.min(25, codigoPagamento.length()))));
        }

        // Adiciona CRC16
        payload += "6304";
        payload += calcularCRC16(payload);

        return payload;
    }

    /**
     * Formata cada campo no formato: ID + (comprimento em 2 dígitos) + valor.
     */
    public static String formatarCampo(String id, String valor) {
        if (valor == null || valor.isEmpty()) return ""; // Evita inserir campos vazios
        return id + String.format("%02d", valor.length()) + valor;
    }

    /**
     * Calcula o CRC16 do payload conforme especificação PIX.
     */
    public static String calcularCRC16(String payload) {
        int polinomio = 0x1021;
        int resultado = 0xFFFF;

        for (char c : payload.toCharArray()) {
            resultado ^= (c << 8);
            for (int i = 0; i < 8; i++) {
                if ((resultado & 0x8000) != 0) {
                    resultado = (resultado << 1) ^ polinomio;
                } else {
                    resultado <<= 1;
                }
            }
        }

        return String.format("%04X", resultado & 0xFFFF);
    }
}
