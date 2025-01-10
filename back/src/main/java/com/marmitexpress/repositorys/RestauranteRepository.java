package com.marmitexpress.repositorys;

import com.marmitexpress.models.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {

    // Buscar restaurante por nome exato
    Optional<Restaurante> findByNome(String nome);

    // Buscar restaurantes por parte do nome (case-insensitive)
    List<Restaurante> findByNomeContainingIgnoreCase(String nome);

    // Buscar restaurantes por endereço
    List<Restaurante> findByEndereco(String endereco);

    // Buscar restaurantes com marmitas disponíveis
    List<Restaurante> findByMarmitasIsNotEmpty();

    // Buscar restaurantes por nome e endereço
    List<Restaurante> findByNomeAndEndereco(String nome, String endereco);

    // Contar restaurantes por nome
    Long countByNome(String nome);

    // Buscar restaurantes ordenados por nome (ascendente)
    List<Restaurante> findAllByOrderByNomeAsc();

    // Buscar restaurantes por intervalo de IDs
    List<Restaurante> findByIdBetween(Long startId, Long endId);

    // Buscar restaurantes por nome ou endereço
    List<Restaurante> findByNomeOrEndereco(String nome, String endereco);

    // Buscar restaurantes com nome que começa com uma letra
    List<Restaurante> findByNomeStartingWith(String prefixo);

    // Buscar restaurantes com nome que termina com uma letra
    List<Restaurante> findByNomeEndingWith(String sufixo);

    // Buscar restaurantes por lista de IDs
    List<Restaurante> findByIdIn(List<Long> ids);

    // Verificar se um restaurante existe por ID
    @SuppressWarnings("null")
    boolean existsById(Long id);

    // Buscar restaurante por ID e nome
    Optional<Restaurante> findByIdAndNome(Long id, String nome);

    // Buscar restaurantes por ID ou nome
    List<Restaurante> findByIdOrNome(Long id, String nome);

    // Buscar restaurantes com IDs diferentes de um valor
    List<Restaurante> findByIdNot(Long id);

    // Buscar restaurantes ordenados por ID (ascendente)
    List<Restaurante> findAllByOrderByIdAsc();

    // Buscar restaurantes ordenados por ID (descendente)
    List<Restaurante> findAllByOrderByIdDesc();
}