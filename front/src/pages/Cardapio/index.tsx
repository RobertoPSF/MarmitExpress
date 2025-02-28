import React from 'react';
import { Container, DivBebidas, DivProteinas, DivSobremesas, DivTamanhoMarmita } from './styles';
import RestauranteCard from '../../components/Cards/TamanhoMarmitaCard';

export default function Cardapio() {
    
    return (
        <Container>
            <DivTamanhoMarmita></DivTamanhoMarmita>
            <DivProteinas></DivProteinas>
            <DivBebidas></DivBebidas>
            <DivSobremesas></DivSobremesas>
        </Container>
    )
}
