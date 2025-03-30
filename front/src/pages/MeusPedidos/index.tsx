import { Container } from './styles';
import { useState } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import PedidoCard from '../../components/Cards/PedidosCard';
import PedidoService from '../../services/PedidoService';

export default function MeusPedidos() {
  useAuthRedirect();
  const [pedidos, setPedidos] = useState([]);
  const pedidoService = new PedidoService();

  return (
    <Container>
      <div>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => <PedidoCard dados={pedido} />)
        ) : (
          <h2>
            Você ainda não tem pedidos. <br />
            Corre lá e faz um agoraa! :D
          </h2>
        )}
      </div>
    </Container>
  );
}
