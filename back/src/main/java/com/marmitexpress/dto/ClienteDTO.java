package com.marmitexpress.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteDTO {
    private String nome;
    private String email;
    private String senha;
    private String endereco;
    private String telefone;
}
