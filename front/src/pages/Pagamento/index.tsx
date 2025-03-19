import React from 'react';
import { useLocation } from 'react-router-dom';
import CardPagamento from '../../components/Cards/PagamentoCard';

const Pagamento: React.FC = () => {
  const location = useLocation();
  const { tamanho, itens, total } = location.state || {
    tamanho: 'Não informado', // Valor padrão para evitar erro
    itens: [],
    total: 0,
  };

  const dados = {
    quantidade: itens.length,
    tamanho: tamanho?.tamanho,
    tipoItem: tamanho?.tamanho
      ? `Marmita (${tamanho.tamanho})`
      : 'Nenhum tamanho selecionado',
    preco: total + (tamanho?.preco || 0), // Adiciona o preço da marmita
    itens: [
      ...itens,
      { nome: `Marmita (${tamanho.tamanho})`, valor: tamanho?.preco || 0 },
    ],
  };

  return <CardPagamento dados={dados} />;
};

export default Pagamento;
