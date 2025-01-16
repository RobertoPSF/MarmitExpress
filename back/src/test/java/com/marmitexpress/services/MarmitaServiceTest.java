package com.marmitexpress.services;

import com.marmitexpress.models.Marmita;
import com.marmitexpress.repositorys.MarmitaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MarmitaServiceTest {

    @Mock
    private MarmitaRepository marmitaRepository;

    @InjectMocks
    private MarmitaService marmitaService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarMarmita() {
        // Arrange
        Marmita marmita = new Marmita();
        marmita.setNome("Marmita Teste");
        marmita.setDescricao("Descrição da marmita");
        marmita.setPreco(10.99);

        when(marmitaRepository.save(marmita)).thenReturn(marmita);

        // Act
        Marmita resultado = marmitaService.criarMarmita(marmita);

        // Assert
        assertNotNull(resultado);
        assertEquals("Marmita Teste", resultado.getNome());
        verify(marmitaRepository, times(1)).save(marmita);
    }

    @Test
    public void testListarMarmitas() {
        // Arrange
        Marmita marmita1 = new Marmita();
        marmita1.setNome("Marmita 1");

        Marmita marmita2 = new Marmita();
        marmita2.setNome("Marmita 2");

        when(marmitaRepository.findAll()).thenReturn(Arrays.asList(marmita1, marmita2));

        // Act
        List<Marmita> resultado = marmitaService.listarMarmitas();

        // Assert
        assertEquals(2, resultado.size());
        verify(marmitaRepository, times(1)).findAll();
    }

    @Test
    public void testBuscarMarmitaPorId() {
        // Arrange
        Marmita marmita = new Marmita();
        marmita.setId(1L);
        marmita.setNome("Marmita Teste");

        when(marmitaRepository.findById(1L)).thenReturn(Optional.of(marmita));

        // Act
        Marmita resultado = marmitaService.buscarMarmitaPorId(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals("Marmita Teste", resultado.getNome());
        verify(marmitaRepository, times(1)).findById(1L);
    }

    @Test
    public void testBuscarMarmitaPorId_NaoEncontrado() {
        // Arrange
        when(marmitaRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Marmita resultado = marmitaService.buscarMarmitaPorId(1L);

        // Assert
        assertNull(resultado);
        verify(marmitaRepository, times(1)).findById(1L);
    }

    @Test
    public void testAtualizarMarmita() {
        // Arrange
        Marmita marmitaExistente = new Marmita();
        marmitaExistente.setId(1L);
        marmitaExistente.setNome("Marmita Antiga");

        Marmita marmitaAtualizada = new Marmita();
        marmitaAtualizada.setNome("Marmita Atualizada");

        when(marmitaRepository.findById(1L)).thenReturn(Optional.of(marmitaExistente));
        when(marmitaRepository.save(marmitaExistente)).thenReturn(marmitaExistente);

        // Act
        Marmita resultado = marmitaService.atualizarMarmita(1L, marmitaAtualizada);

        // Assert
        assertNotNull(resultado);
        assertEquals("Marmita Atualizada", resultado.getNome());
        verify(marmitaRepository, times(1)).findById(1L);
        verify(marmitaRepository, times(1)).save(marmitaExistente);
    }

    @Test
    public void testDeletarMarmita() {
        // Arrange
        doNothing().when(marmitaRepository).deleteById(1L);

        // Act
        marmitaService.deletarMarmita(1L);

        // Assert
        verify(marmitaRepository, times(1)).deleteById(1L);
    }
}
