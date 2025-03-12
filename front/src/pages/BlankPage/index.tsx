import React from 'react';
import { BlankPageContainer } from './styles';
import Card from '../../components/Cards/PagamentoCard';
 
const BlankPage: React.FC = () => {
  const dados = {
    quantidade: 4,
    tipoItem: "marmita (G)",
    preco: 25.50
  };
  return <BlankPageContainer>
    <Card dados={dados} />
  </BlankPageContainer>;
};

export default BlankPage;
