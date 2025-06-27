import { useEffect, useMemo, useState } from 'react';
import { Container, ContainerPedidos, FiltroWrapper, Select } from './styles';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import PedidoCard from '../../components/Cards/PedidosCard';
import PedidoService from '../../services/PedidoService';

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
  precoTotal: number;
  itensIds: [];
}

export default function MeusPedidos() {
  useAuthRedirect();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [statusFiltro, setStatusFiltro] = useState<Status | 'TODOS'>('TODOS');

  useEffect(() => {
    const pedidoService = new PedidoService();

    pedidoService
      .getPedidosByCliente()
      .then((res) => {
        if (res?.data) setPedidos(res.data);
      })
      .catch((err) => console.error('Erro ao obter pedidos:', err));
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
      {/* ---------- Seletor de status ---------- */}
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

      {/* ---------- Lista de pedidos ---------- */}
      <ContainerPedidos>
        {pedidosFiltrados.length ? (
          pedidosFiltrados.map((pedido) => <PedidoCard key={pedido.id} dados={pedido} />)
        ) : (
          <h2 style={{ alignSelf: 'center', color: 'white' }}>
            Nenhum pedido para o filtro selecionado.
          </h2>
        )}
      </ContainerPedidos>
    </Container>
  );
}
