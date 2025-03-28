package com.marmitexpress.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login", "/auth/register", "/auth/new-password").permitAll()

                        .requestMatchers(HttpMethod.GET, "/clientes").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/clientes/me").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.PUT, "/clientes/me").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.DELETE, "/clientes/{id}").hasAnyRole("ADMIN", "CLIENTE")

                        .requestMatchers(HttpMethod.GET, "/restaurantes", "/restaurantes/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/restaurantes/me").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.PUT, "/restaurantes/me").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.DELETE, "/restaurantes/{id}").hasAnyRole("RESTAURANTE", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/ingredientes").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.GET, "/ingredientes", "/ingredientes/{id}", "/ingredientes/restaurante/{restauranteId}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/ingredientes/{id}").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.DELETE, "/ingredientes/{id}").hasAnyRole("RESTAURANTE", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/itens").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.GET, "/itens", "/itens/{id}", "/itens/restaurante/{restauranteId}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/itens/{id}").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.DELETE, "/itens/{id}").hasAnyRole("RESTAURANTE", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/marmitas").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.GET, "/marmitas", "/marmitas/{id}", "/marmitas/restaurante/{restauranteId}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/marmitas/{id}").hasRole("RESTAURANTE")
                        .requestMatchers(HttpMethod.DELETE, "/marmitas/{id}").hasAnyRole("RESTAURANTE", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/pedidos").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.GET, "/pedidos/{id}", "/clientes/{id}/pedidos").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.DELETE, "/pedidos/{id}").hasRole("CLIENTE")

                        .requestMatchers(HttpMethod.POST, "/pagamentos").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.GET, "/pagamentos/{id}/qrcode", "/pagamentos/{id}/status").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.PATCH, "/pagamentos/{id}/confirmar").hasRole("RESTAURANTE")

                        .requestMatchers(HttpMethod.GET, "/health").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
