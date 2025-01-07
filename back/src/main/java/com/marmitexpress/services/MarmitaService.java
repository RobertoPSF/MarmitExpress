package com.marmitexpress.services;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.repositorys.MarmitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarmitaService {

    @Autowired
    private MarmitaRepository marmitaRepository;

    // Criar uma nova marmita
    public Marmita criarMarmita(Marmita marmita) {
        return marmitaRepository.save(marmita);
    }

    // Listar todas as marmitas
    public List<Marmita> listarMarmitas() {
        return marmitaRepository.findAll();
    }

    // Buscar uma marmita por ID
    public Marmita buscarMarmitaPorId(Long id) {
        return marmitaRepository.findById(id).orElse(null);
    }

    // Atualizar uma marmita
    public Marmita atualizarMarmita(Long id, Marmita marmitaAtualizada) {
        Marmita marmitaExistente = marmitaRepository.findById(id).orElse(null);
        if (marmitaExistente != null) {
            marmitaExistente.setNome(marmitaAtualizada.getNome());
            marmitaExistente.setDescricao(marmitaAtualizada.getDescricao());
            marmitaExistente.setPreco(marmitaAtualizada.getPreco());
            return marmitaRepository.save(marmitaExistente);
        }
        return null;
    }

    // Deletar uma marmita
    public void deletarMarmita(Long id) {
        marmitaRepository.deleteById(id);
    }

    // Buscar marmitas por restaurante
    public List<Marmita> buscarMarmitasPorRestaurante(Long restauranteId) {
        return marmitaRepository.findByRestauranteId(restauranteId);
    }
}