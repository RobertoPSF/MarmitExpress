import React from 'react';
import { BlankPageContainer } from './styles';
import Card from '../../components/Cards/RestauranteCard';
import Card2 from '../../components/Cards/TamanhoMarmitaCard';
import Card3 from '../../components/Cards/ItensCard';

const BlankPage: React.FC = () => {
  return (
    <BlankPageContainer>
      <Card />
      <Card2 />
      <Card3 />
    </BlankPageContainer>
  );
};

export default BlankPage;
