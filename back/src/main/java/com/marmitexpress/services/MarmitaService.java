package com.marmitexpress.services;

import com.marmitexpress.exceptions.MarmitaNotFoundException;
import com.marmitexpress.models.Marmita;
import com.marmitexpress.repositorys.MarmitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarmitaService {

    @Autowired
    private MarmitaRepository marmitaRepository;

    public Marmita criarMarmita(Marmita marmita) {
        return marmitaRepository.save(marmita);
    }

    public List<Marmita> listarMarmitas() {
        return marmitaRepository.findAll();
    }

    public Optional<Marmita> buscarMarmitaPorId(Long id) {
        return marmitaRepository.findById(id);
    }

    public void deletarMarmita(Long id) {
        if (!marmitaRepository.existsById(id)) {
            throw new MarmitaNotFoundException();
        }
        marmitaRepository.deleteById(id);
    }

    public Marmita atualizarMarmita(Long id, Marmita marmitaAtualizada) {
        Optional<Marmita> marmitaOpt = marmitaRepository.findById(id);
        if (marmitaOpt.isEmpty()) {
            throw new MarmitaNotFoundException();
        }

        Marmita marmitaExistente = marmitaOpt.get();

        if (marmitaAtualizada.getNome() != null) {
            marmitaExistente.setNome(marmitaAtualizada.getNome());
        }
        if (marmitaAtualizada.getPreco() != 0) {
            marmitaExistente.setPreco(marmitaAtualizada.getPreco());
        }
        if (marmitaAtualizada.getQuantidade() != 0) {
            marmitaExistente.setQuantidade(marmitaAtualizada.getQuantidade());
        }
        if (marmitaAtualizada.getIngredientes() != null) {
            marmitaExistente.setIngredientes(marmitaAtualizada.getIngredientes());
        }
        if (marmitaAtualizada.getRestaurante() != null) {
            marmitaExistente.setRestaurante(marmitaAtualizada.getRestaurante());
        }

        return marmitaRepository.save(marmitaExistente);
    }
}
