import { useEffect, useMemo, useState } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import PedidoCardRestaurante from '../../components/Cards/PedidosCardRestaurante';
import RestaurantService from '../../services/RestauranteService';
import { Container, ContainerPedidos, FiltroWrapper, Select } from './styles';   // veja o SC no fim

type Status =
  | 'PENDENTE'
  | 'EM_PREPARO'
  | 'PRONTO'
  | 'A_CAMINHO'
  | 'ENTREGUE';

interface Pedido {
  id: string;
  restauranteId: string;
  endereco: string;
  status: string;
  preco: number;
  itensIds: [];
}

export default function MeusPedidosRestaurante() {
  useAuthRedirect();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [statusFiltro, setStatusFiltro] = useState<Status | 'TODOS'>('TODOS');

  /** carrega pedidos ao montar */
  useEffect(() => {
    const restauranteService = new RestaurantService();
    const token = localStorage.getItem('authToken');

    if (!token) return;

    try {
      const { id } = JSON.parse(atob(token.split('.')[1]));
      restauranteService
        .getRestaurantById(id)
        .then((res) => {
          if (res?.data?.listaDePedidos) {
            setPedidos(res.data.listaDePedidos);
          }
        })
        .catch((err) => console.error('Erro ao obter pedidos:', err));
    } catch (err) {
      console.error('Erro ao decodificar token:', err);
    }
  }, []);

  /** memoriza a lista filtrada sempre que statusFiltro ou pedidos mudam */
  const pedidosFiltrados = useMemo(() => {
    if (statusFiltro === 'TODOS') return pedidos;
    return pedidos.filter((pedido) => pedido.status === statusFiltro);
  }, [pedidos, statusFiltro]);

  return (
    <Container>
      <FiltroWrapper>
        <label htmlFor="status">Filtrar por status:</label>
        <Select
          id="status"
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value as Status | 'TODOS')}
        >
          <option value="TODOS">Todos</option>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_PREPARO">Em preparo</option>
          <option value="PRONTO">Pronto</option>
          <option value="A_CAMINHO">A caminho</option>
          <option value="ENTREGUE">Entregue</option>
        </Select>
      </FiltroWrapper>

      <ContainerPedidos>
          {pedidosFiltrados.length ? (
            pedidosFiltrados.map((pedido) => (
              <PedidoCardRestaurante key={pedido.id} dados={pedido} />
            ))
          ) : (
            <h2 style={{ color: 'black' }}>Sem pedidos para o filtro selecionado.</h2>
          )}
      </ContainerPedidos>
    </Container>
  );
}
