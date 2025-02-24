package com.marmitexpress.services;

import com.marmitexpress.exceptions.MarmitaNotFoundException;
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

    @InjectMocks
    private MarmitaService marmitaService;

    @Mock
    private MarmitaRepository marmitaRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarMarmita() {
        Marmita marmita = new Marmita();

        when(marmitaRepository.save(marmita)).thenReturn(marmita);

        Marmita marmitaCriada = marmitaService.criarMarmita(marmita);
        assertNotNull(marmitaCriada);
        assertEquals(3, marmitaCriada.getIngredientes().size());
        assertEquals("Arroz", marmitaCriada.getIngredientes().get(0));
    }

    @Test
    public void testListarMarmitas() {
        List<Marmita> marmitas = Arrays.asList(
            new Marmita(),
            new Marmita()
        );

        when(marmitaRepository.findAll()).thenReturn(marmitas);

        List<Marmita> resultado = marmitaService.listarMarmitas();
        assertEquals(2, resultado.size());
        assertEquals("Macarrão", resultado.get(1).getIngredientes().get(0));
    }

    @Test
    public void testBuscarMarmitaPorId_Existe() {
        Marmita marmita = new Marmita();
        when(marmitaRepository.findById(1L)).thenReturn(Optional.of(marmita));

        Optional<Marmita> resultado = marmitaService.buscarMarmitaPorId(1L);
        assertTrue(resultado.isPresent());
        assertEquals("Frango", resultado.get().getIngredientes().get(2));
    }

    @Test
    public void testBuscarMarmitaPorId_NaoExiste() {
        when(marmitaRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Marmita> resultado = marmitaService.buscarMarmitaPorId(99L);
        assertFalse(resultado.isPresent());
    }

    @Test
    public void testDeletarMarmita_Existe() {
        when(marmitaRepository.existsById(1L)).thenReturn(true);
        doNothing().when(marmitaRepository).deleteById(1L);

        assertDoesNotThrow(() -> marmitaService.deletarMarmita(1L));
        verify(marmitaRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeletarMarmita_NaoExiste() {
        when(marmitaRepository.existsById(99L)).thenReturn(false);

        assertThrows(MarmitaNotFoundException.class, () -> marmitaService.deletarMarmita(99L));
    }
}
