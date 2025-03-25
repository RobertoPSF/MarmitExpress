import React from 'react';
import { BlankPageContainer } from './styles';
import Card from '../../components/Cards/ExclusiveVisualisationRestauranteCard';
 
const BlankPage: React.FC = () => {
  const dados = {
    nome: 'Casa do Galioto',
    aceitandoPedidos: true,
    endereco: 'Rua Exemplo, 123'
  };
  return <BlankPageContainer>
         <Card dados={dados} />
         </BlankPageContainer>;
};

export default BlankPage;
