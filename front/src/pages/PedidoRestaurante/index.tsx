import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardPagamento from '../../components/Cards/PagamentoCard';
import PedidoService from '../../services/PedidoService';

const Pedido: React.FC = () => {
  const { id: pedidoId } = useParams(); // Captura o ID do pedido da URL
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<any>(null);

  useEffect(() => {
    if (!pedidoId) {
      console.warn('ID do pedido não encontrado na URL. Redirecionando...');
      navigate('/pedidos');
      return;
    }

    const fetchPedido = async () => {
      try {
        const response = await new PedidoService().getPedidoById(pedidoId);
        if (response && response.status === 200) {
          setPedido(response.data);
        } else {
          console.warn('Pedido não encontrado. Redirecionando...');
          navigate('/pedidos');
        }
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        navigate('/pedidos');
      }
    };

    fetchPedido();
  }, [pedidoId, navigate]);

  if (!pedido) return <p>Carregando pedido...</p>;

  const { id, clienteId, restauranteId, status, precoTotal, itensIds } = pedido;

  const dados = {
    id,
    clienteId,
    restauranteId,
    status,
    quantidade: itensIds.length,
    tipoItem: `${id}`,
    preco: precoTotal,
    itens: itensIds.map((itemId: string) => ({
      id: `${itemId}`,
      valor: 0,
    })),
  };

  return <CardPagamento dados={dados} />;
};

export default Pedido;
