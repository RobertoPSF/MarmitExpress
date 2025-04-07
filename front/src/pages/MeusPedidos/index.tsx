import { Container } from './styles';
import { useEffect, useState } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import PedidoCard from '../../components/Cards/PedidosCard';
import PedidoService from '../../services/PedidoService';

export default function MeusPedidos() {
  useAuthRedirect();
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    const pedidoService = new PedidoService();
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        pedidoService
          .getPedidosByCliente()
          .then((response) => {
            if (response?.data) {
              setPedidos(response.data);
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
        pedidos.map((pedido) => <PedidoCard key={pedido.id} dados={pedido} />)
      ) : (
        <h2
          style={{
            position: 'absolute',
            alignSelf: 'center',
            justifySelf: 'center',
          }}
        >
          Você ainda não tem pedidos. <br />
          Corre lá e faz um agoraa! :D
        </h2>
      )}
    </Container>
  );
}
