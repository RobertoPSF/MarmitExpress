package com.marmitexpress.dto;

import com.marmitexpress.models.UsuarioRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterDto(
        @NotNull(message = "O atributo role é obrigatório!")
        UsuarioRole role,
        @NotBlank(message = "O atributo nome é obrigatório!")
        @Size(min = 3, message = "O nome deve conter no mínimo 3 caracteres!")
        String nome,
        @Email
        @NotBlank(message = "O atributo email é obrigatório!")
        String email,
        @NotBlank(message = "O atributo senha é obrigatório!")
        @Size(min = 6, max = 20, message = "A senha deve conter no mínimo 6 e máximo 20 caracteres!")
        String senha) {
}
