package com.marmitexpress.controllers;

import com.marmitexpress.dto.AuthenticationDto;
import com.marmitexpress.dto.LoginResponseDto;
import com.marmitexpress.dto.RegisterDto;
import com.marmitexpress.repositorys.UsuarioRepository;
import com.marmitexpress.services.TokenService;
import com.marmitexpress.models.Cliente;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.models.Usuario;
import com.marmitexpress.models.UsuarioRole;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "${CORS_ORIGIN}", allowedHeaders = "*")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthenticationController(AuthenticationManager authenticationManager, 
                                    TokenService tokenService, 
                                    UsuarioRepository usuarioRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDto data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
            var auth = authenticationManager.authenticate(usernamePassword);

            var token = tokenService.generateToken((Usuario) auth.getPrincipal());
            return ResponseEntity.ok(new LoginResponseDto(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro na autenticação: " + e.getMessage());
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDto data) {
        Optional<Usuario> existingUser = usuarioRepository.findByEmail(data.email());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email já cadastrado.");
        }

        String encryptedPassword = passwordEncoder.encode(data.senha());
        
        Usuario newUsuario;
        if (data.role() == UsuarioRole.CLIENTE) {
            newUsuario = new Cliente(data.nome(), data.email(), encryptedPassword);
        } else if (data.role() == UsuarioRole.RESTAURANTE) {
            newUsuario = new Restaurante(data.nome(), data.email(), encryptedPassword);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de usuário inválido.");
        }

        usuarioRepository.save(newUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso.");
    }



    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return errors;
    }
}
