import React from 'react';
import { BlankPageContainer } from './styles';
import Card from '../../components/Cards/RestauranteCard';
 
const BlankPage: React.FC = () => {
  const dados = {
    id: 1,
    nome: 'Casa do Galioto',
    endereco: 'Rua Francisco Galioto, 123',
    descricao: 'Aberto das 10h às 22h',
    telefone: '(83) 99999-9999',
    avaliacoes: 5.0
  };
  return <BlankPageContainer>
    <Card dados={dados} />
  </BlankPageContainer>;
};

export default BlankPage;
