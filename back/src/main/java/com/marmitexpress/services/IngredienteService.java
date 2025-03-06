package com.marmitexpress.services;

import com.marmitexpress.dto.IngredienteDTO;
import com.marmitexpress.dto.IngredienteResponseDTO;
import com.marmitexpress.models.Ingrediente;
import com.marmitexpress.models.Restaurante;
import com.marmitexpress.repositorys.IngredienteRepository;
import com.marmitexpress.repositorys.RestauranteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class IngredienteService {

    @Autowired
    private IngredienteRepository ingredienteRepository;

    @Autowired
    private RestauranteRepository restauranteRepository;

    public IngredienteResponseDTO createIngrediente(UUID restauranteId, IngredienteDTO ingredienteDTO) {
        Restaurante restaurante = restauranteRepository.findById(restauranteId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurante não encontrado"));

        if (ingredienteDTO.getNome() == null || ingredienteDTO.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do ingrediente não pode estar vazio.");
        }

        Ingrediente ingrediente = new Ingrediente(ingredienteDTO.getNome(), restaurante);
        Ingrediente savedIngrediente = ingredienteRepository.save(ingrediente);
        return new IngredienteResponseDTO(savedIngrediente.getId(), savedIngrediente.getNome(), restauranteId);
    }

    public List<IngredienteResponseDTO> getIngredientesByRestaurante(UUID restauranteId) {
        return ingredienteRepository.findByRestauranteId(restauranteId).stream()
                .map(ingrediente -> new IngredienteResponseDTO(ingrediente.getId(), ingrediente.getNome(), restauranteId))
                .collect(Collectors.toList());
    }

    public List<IngredienteResponseDTO> getAllIngredientes() {
        return ingredienteRepository.findAll().stream()
                .map(ingrediente -> new IngredienteResponseDTO(ingrediente.getId(), ingrediente.getNome(), ingrediente.getRestaurante().getId()))
                .collect(Collectors.toList());
    }

    public IngredienteResponseDTO getIngredienteById(UUID id) {
        Ingrediente ingrediente = ingredienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ingrediente não encontrado"));
        return new IngredienteResponseDTO(ingrediente.getId(), ingrediente.getNome(), ingrediente.getRestaurante().getId());
    }

    public IngredienteResponseDTO updateIngrediente(UUID ingredienteId, UUID restauranteId, IngredienteDTO ingredienteDTO) {
        Ingrediente ingrediente = ingredienteRepository.findById(ingredienteId)
                .orElseThrow(() -> new EntityNotFoundException("Ingrediente não encontrado"));

        if (!ingrediente.getRestaurante().getId().equals(restauranteId)) {
            throw new AccessDeniedException("Acesso negado: você não pode modificar este ingrediente.");
        }

        if (ingredienteDTO.getNome() == null || ingredienteDTO.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do ingrediente não pode estar vazio.");
        }

        ingrediente.setNome(ingredienteDTO.getNome());
        Ingrediente updatedIngrediente = ingredienteRepository.save(ingrediente);
        return new IngredienteResponseDTO(updatedIngrediente.getId(), updatedIngrediente.getNome(), restauranteId);
    }

    public void deleteIngrediente(UUID ingredienteId, UUID restauranteId) {
        Ingrediente ingrediente = ingredienteRepository.findById(ingredienteId)
                .orElseThrow(() -> new EntityNotFoundException("Ingrediente não encontrado"));

        if (!ingrediente.getRestaurante().getId().equals(restauranteId)) {
            throw new AccessDeniedException("Acesso negado: você não pode excluir este ingrediente.");
        }

        ingredienteRepository.delete(ingrediente);
    }
}
