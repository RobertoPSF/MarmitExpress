import React from 'react';
import { BlankPageContainer } from './styles';
import Card from '../../components/Cards/PedidosCard';
 
const BlankPage: React.FC = () => {
  const dados = {
    nomeRestaurante: 'Casa do Galioto',
    dataDoPedido: "17/03/2025 17:00H",
    total: 200.00,
    statusPedido: "Em andamento"
  };
  return <BlankPageContainer>
         <Card dados={dados} />
         </BlankPageContainer>;
};

export default BlankPage;
