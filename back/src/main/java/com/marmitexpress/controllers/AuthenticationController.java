package com.marmitexpress.controllers;

import com.marmitexpress.dto.AuthenticationDto;
import com.marmitexpress.dto.LoginResponseDto;
import com.marmitexpress.dto.RegisterDto;
import com.marmitexpress.repositorys.UsuarioRepository;
import com.marmitexpress.services.TokenService;
import com.marmitexpress.models.Admin;
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

        if(data.role() == UsuarioRole.RESTAURANTE && data.nomeProprietario() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome do proprietário é obrigatório para o restaurante.");
        }
        if(data.role() == UsuarioRole.RESTAURANTE && data.nomeProprietario().length() < 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome do proprietário deve ter no mínimo 3 caracteres.");
        }
        String encryptedPassword = passwordEncoder.encode(data.senha());
        
        Usuario newUsuario;
        if (data.role() == UsuarioRole.CLIENTE) {
            newUsuario = new Cliente(data.nome(), data.email(), encryptedPassword, data.endereco(), data.telefone());
        } else if (data.role() == UsuarioRole.RESTAURANTE) {
            Restaurante restaurante = new Restaurante();
            restaurante.setNome(data.nome());
            restaurante.setEmail(data.email());
            restaurante.setSenha(encryptedPassword);
            restaurante.setEndereco(data.endereco());
            restaurante.setTelefone(data.telefone());
            restaurante.setRole(UsuarioRole.RESTAURANTE);
            restaurante.setNomeProprietario(data.nomeProprietario());
            newUsuario = restaurante;
        } else if (data.role() == UsuarioRole.ADMIN) {
            newUsuario = new Admin(data.nome(), data.email(), encryptedPassword, data.endereco(), data.telefone());
        } else {    
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de usuário inválido.");
        }
        System.out.println(newUsuario);
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

    @PostMapping("/new-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid AuthenticationDto data) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(data.email());
        
        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
        
        Usuario usuario = usuarioOptional.get();
        usuario.setSenha(passwordEncoder.encode(data.senha()));
        usuarioRepository.save(usuario);
        
        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }
}