import React from 'react';
import CardPagamento from '../../components/Cards/PagamentoCard'

const Pagamento: React.FC = () => {
  const dados = {
    quantidade: 4,
    tipoItem: "marmita (G)",
    preco: 25.50
  };
  
  return(
    <CardPagamento dados={dados}/>
  );
};

export default Pagamento;
