package com.marmitexpress.services;

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
}
