import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardPagamentoRestaurante from '../../components/Cards/PagamentoRestauranteCard';
import RestauranteService from '../../services/RestauranteService';

const PedidoRestaurante: React.FC = () => {
  const { id: pedidoId } = useParams(); // ID do pedido via rota
  const navigate = useNavigate();
  const [dadosPagamento, setDadosPagamento] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!pedidoId) {
      console.warn('ID do pedido não encontrado na URL. Redirecionando...');
      navigate('/pedidos');
      return;
    }

    const fetchPedidoDoRestaurante = async () => {
      try {
        const restauranteService = new RestauranteService();
        const restaurante = await restauranteService.getMyProfile();

        if (!restaurante?.data) {
          throw new Error('Restaurante não encontrado.');
        }

        const pedidoEncontrado = restaurante.data.listaDePedidos.find(
          (pedido: any) => String(pedido.id) === String(pedidoId),
        );

        if (!pedidoEncontrado) {
          console.warn('Pedido não encontrado no restaurante.');
          navigate('/pedidos');
          return;
        }

        setDadosPagamento(pedidoEncontrado);
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        navigate('/pedidos');
      } finally {
        setCarregando(false);
      }
    };

    fetchPedidoDoRestaurante();
  }, [pedidoId, navigate]);

  if (carregando) return <p>Carregando pedido...</p>;
  if (!dadosPagamento) return <p>Pedido não encontrado.</p>;

  return <CardPagamentoRestaurante dados={dadosPagamento} />;
};

export default PedidoRestaurante;
