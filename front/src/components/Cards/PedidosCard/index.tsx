import { useEffect, useState } from 'react';
import {
  Container,
  StyledIcon,
  Footer,
  Header,
  Informations,
  Line,
} from './styles';
import RestaurantService from '../../../services/RestauranteService';

interface Pedido {
  id: string;
  restauranteId: string;
  status: string;
  precoTotal: number;
  itensIds: [];
}

interface PedidoCardProps {
  dados: Pedido | null;
}

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor,
  );

export default function PedidoCard({ dados }: PedidoCardProps) {
  const [nomeRestaurante, setNomeRestaurante] = useState<string | null>(null);
  const restaurantService = new RestaurantService();

  useEffect(() => {
    if (dados?.restauranteId) {
      restaurantService
        .getRestaurantById(dados.restauranteId)
        .then((response) => {
          if (response?.status === 200) {
            setNomeRestaurante(response.data.nome);
          } else {
            console.warn('Nome do restaurante não encontrado.');
          }
        })
        .catch((error) => console.error('Erro ao buscar restaurante:', error));
    }
  }, [dados?.restauranteId]);

  if (!dados) {
    return <p>Pedido não encontrado.</p>;
  }

  return (
    <Container to={`/meus-pedidos/${dados.id}`}>
      <Header>
        <Informations>
          <p id="nomeRestaurante">
            Pedido no(a): {nomeRestaurante || 'Restaurante desconhecido'}
          </p>
          <p id="totalPedido">Total: {formatarMoeda(dados.precoTotal)}</p>
        </Informations>

        <StyledIcon icon={'material-symbols-light:keyboard-arrow-right'} />
      </Header>
      <Line />
      <Footer>
        <p>{dados.status}</p>
      </Footer>
    </Container>
  );
}
