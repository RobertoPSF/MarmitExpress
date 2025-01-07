package com.marmitexpress.repositorys;

import com.marmitexpress.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método para buscar um usuário por email
    Usuario findByEmail(String email);
}