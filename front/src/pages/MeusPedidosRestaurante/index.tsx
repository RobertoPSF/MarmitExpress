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

  const pedidosFiltrados = useMemo(() => {
    const ordemStatus: Record<Status, number> = {
      PENDENTE:    0,
      EM_PREPARO:  1,
      PRONTO:      2,
      A_CAMINHO:   3,
      ENTREGUE:    4,
    };

    /* 1) aplica filtro se houver */
    const lista = statusFiltro === 'TODOS'
      ? pedidos
      : pedidos.filter((p) => p.status === statusFiltro);

    /* 2) ordena: status desejado primeiro; empate → id DESC */
    return lista
      .slice() // cópia para não mutar o state
      .sort((a, b) => {
        const diffStatus = ordemStatus[a.status as Status] - ordemStatus[b.status as Status];
        if (diffStatus !== 0) return diffStatus;                 // critério 1 → status
        return Number(b.id) - Number(a.id);                      // critério 2 → id decrescente
      });
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
            <h2 style={{ color: 'white' }}>Sem pedidos para o filtro selecionado.</h2>
          )}
      </ContainerPedidos>
    </Container>
  );
}
