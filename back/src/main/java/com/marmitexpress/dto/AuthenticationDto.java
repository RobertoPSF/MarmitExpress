package com.marmitexpress.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationDto(
        @NotBlank(message = "O atributo email é obrigatório!")
        String email,
        @NotBlank(message = "O atributo senha é obrigatório!")
        String senha)
    {
}
