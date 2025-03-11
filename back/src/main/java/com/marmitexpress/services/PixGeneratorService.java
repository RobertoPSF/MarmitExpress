package com.marmitexpress.services;

public class PixGeneratorService{
    
    public static String gerarPayloadPix(String chavePix, String nomeCobranca, double valor,
    String nomeReceptor, String cidadeReceptor, String codigoPagamento){
        String payload = "000201";
        String merchantAccountInfo = "";
        merchantAccountInfo += formatarCampo("00", "br.gov.bcb.pix");
        merchantAccountInfo += formatarCampo("01", chavePix);
        merchantAccountInfo += formatarCampo("02", nomeCobranca);
        payload += formatarCampo("26", merchantAccountInfo);
        payload += formatarCampo("52", "0000");
        payload += formatarCampo("53", "986");
        payload += formatarCampo("54",  String.valueOf(valor));
        payload += formatarCampo("58", "BR");
        payload += formatarCampo("59", nomeReceptor);
        payload += formatarCampo("60", cidadeReceptor);
        String additionalData = formatarCampo("05", codigoPagamento);
        payload += formatarCampo("62", additionalData);
        payload += "6304";
        String crc16 = calcularCRC16(payload);
        payload += crc16;
        return payload;
    }

    private static String formatarCampo(String id, String valor){
        return id + String.format("%02d", valor.length()) + valor;
    }

    private static String calcularCRC16(String payload){
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