package com.marmitexpress.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestauranteDTO {
    private String nomeRestaurante;
    private String nomeProprietario;
    private String email;
    private String senha;
    private String endereco;
    private String telefone;
    private String descricao;
    private Boolean aceitandoPedidos;
    private String chavePix;
    
}
