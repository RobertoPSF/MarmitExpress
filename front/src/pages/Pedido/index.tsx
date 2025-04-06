import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardPagamento from '../../components/Cards/PagamentoCard';
import RestauranteService from '../../services/RestauranteService';
import PedidoService from '../../services/PedidoService';

const Pedido: React.FC = () => {
  const { id: pedidoId } = useParams(); // ID do pedido via rota
  const navigate = useNavigate();
  const [dadosPagamento, setDadosPagamento] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!pedidoId) {
      console.warn('ID do pedido não encontrado na URL. Redirecionando...');
      navigate('/meus-pedidos');
      return;
    }

    const fetchPedidoDoRestaurante = async () => {
      try {
        const restauranteService = new RestauranteService();
        const pedidoService = new PedidoService();
        const pedido = await pedidoService.getPedidoById(pedidoId);

        const restaurante = await restauranteService.getRestaurantById(
          pedido?.data.restauranteId,
        );

        if (!restaurante?.data) {
          throw new Error('Restaurante não encontrado.');
        }

        const pedidoEncontrado = restaurante.data.listaDePedidos.find(
          (pedido: any) => String(pedido.id) === String(pedidoId),
        );

        if (!pedidoEncontrado) {
          console.warn('Pedido não encontrado no restaurante.');
          navigate('/meus-pedidos');
          return;
        }

        // Aqui estamos mantendo o formato completo do pedido
        const dadosCompletos = {
          ...pedidoEncontrado,
          clienteId: pedido?.data.clienteId,
          restauranteId: pedido?.data.restauranteId,
        };

        setDadosPagamento(dadosCompletos);
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        navigate('/meus-pedidos');
      } finally {
        setCarregando(false);
      }
    };

    fetchPedidoDoRestaurante();
  }, [pedidoId, navigate]);

  if (carregando) return <p>Carregando pedido...</p>;
  if (!dadosPagamento) return <p>Pedido não encontrado.</p>;

  return <CardPagamento dados={dadosPagamento} />;
};

export default Pedido;
