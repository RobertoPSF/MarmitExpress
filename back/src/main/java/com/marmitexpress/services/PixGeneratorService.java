package com.marmitexpress.services;

public class PixGeneratorService {

    public static String gerarPayloadPix(String chavePix, String nomeCobranca, double valor,
                                         String nomeReceptor, String cidadeReceptor, String codigoPagamento) {
        String payload = "000201";

        // Merchant Account Information (tag 26)
        String merchantAccountInfo = formatarCampo("00", "br.gov.bcb.pix") + formatarChavePix(chavePix);

        if (nomeCobranca != null && !nomeCobranca.isEmpty()) {
            merchantAccountInfo += formatarCampo("02", nomeCobranca);
        }

        payload += formatarCampo("26", merchantAccountInfo);

        // Outros campos fixos do Pix
        payload += formatarCampo("52", "0000");
        payload += formatarCampo("53", "986");
        payload += formatarCampo("54", String.format("%.2f", valor).replace(",", ".")); // Ajuste na formatação do valor
        payload += formatarCampo("58", "BR");
        payload += formatarCampo("59", nomeReceptor);
        payload += formatarCampo("60", cidadeReceptor);

        // Additional Data Field Template (tag 62)
        if (codigoPagamento != null && !codigoPagamento.isEmpty()) {
            String additionalData = formatarCampo("05", codigoPagamento);
            payload += formatarCampo("62", additionalData);
        }

        // Adiciona CRC16
        payload += "6304";
        payload += calcularCRC16(payload);

        return payload;
    }

    /**
     * Verifica o tipo da chave Pix e a formata corretamente para evitar erros.
     */
    public static String formatarChavePix(String chavePix) {
        if (chavePix.contains("@")) { // E-mail
            return formatarCampo("01", chavePix);
        } else if (chavePix.matches("^\\+?\\d{11,}$")) { // Telefone (com ou sem +55)
            return formatarCampo("01", chavePix);
        } else if (chavePix.matches("^\\d{11}$") || chavePix.matches("^\\d{14}$")) { // CPF ou CNPJ
            return formatarCampo("01", chavePix);
        } else if (chavePix.matches("^[a-fA-F0-9\\-]{32,36}$")) { // Chave Aleatória (32 a 36 caracteres)
            return formatarCampo("01", chavePix);
        } else {
            throw new IllegalArgumentException("Chave Pix inválida: " + chavePix);
        }
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