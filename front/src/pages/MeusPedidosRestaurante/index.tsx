import { Container } from './styles';
import { useEffect, useState } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import PedidoCardRestaurante from '../../components/Cards/PedidosCardRestaurante';
import RestaurantService from '../../services/RestauranteService';

export default function MeusPedidosRestaurante() {
  useAuthRedirect();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const restauranteService = new RestaurantService();
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const id = JSON.parse(atob(token.split('.')[1])).id;
        restauranteService
          .getRestaurantById(id)
          .then((response) => {
            if (response?.data) {
              setPedidos(response.data.listaDePedidos);
            }
          })
          .catch((error) => {
            console.error('Erro ao obter pedidos:', error);
          });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  return (
    <Container>
      {pedidos.length > 0 ? (
        pedidos.map((pedido) => <PedidoCardRestaurante dados={pedido} />)
      ) : (
        <h2 style={{ color: 'white' }}>Sem pedidos existentes.</h2>
      )}
    </Container>
  );
}
