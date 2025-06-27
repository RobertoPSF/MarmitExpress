import { Container, Row, Line, ItemCard } from './styles';
import Button from '../../Button';
import { useEffect, useState } from 'react';
import IngredienteService from '../../../services/IngredienteService';
import PagamentoService from '../../../services/PagamentoService';
import PedidoService from '../../../services/PedidoService';

interface Pagamento {
  id: string;
  endereco: string;
  status: string;
  preco: number;
  pagamentoId?: string;
  itens: {
    id: string;
    item: {
      id: string;
      nome: string;
      preco: number;
      quantidade: number;
      foto: string | null;
    };
    quantidade: number;
    ingredientesPersonalizados: string[];
  }[];
}

interface PagamentoCardProps {
  dados: Pagamento;
}

export default function PagamentoRestauranteCard({
  dados,
}: PagamentoCardProps) {
  const { preco, itens, id, status, endereco } = dados;

  const [nomesIngredientes, setNomesIngredientes] = useState<
    Record<string, string>
  >({});
  const [statusAtual, setStatusAtual] = useState<string>(status);

  useEffect(() => {
    async function fetchNomesIngredientes() {
      try {
        const ids = itens
          .flatMap((item) => item.ingredientesPersonalizados || [])
          .filter((id, i, arr) => id && arr.indexOf(id) === i);

        const ingredienteService = new IngredienteService();
        const results = await Promise.all(
          ids.map(async (id) => {
            try {
              const res = await ingredienteService.getIngredienteById(id);
              return { id, nome: res?.data?.nome || 'Acompanhamento' };
            } catch {
              return { id, nome: 'Acompanhamento' };
            }
          }),
        );

        const nomesMapeados: Record<string, string> = {};
        results.forEach(({ id, nome }) => {
          nomesMapeados[id] = nome;
        });

        setNomesIngredientes(nomesMapeados);
      } catch (error) {
        console.error('Erro ao buscar nomes dos ingredientes:', error);
      }
    }

    fetchNomesIngredientes();
  }, [itens]);

  const getNextStatus = (status: string) => {
    switch (status) {
      case 'PENDENTE':
        return 'EM_PREPARO';
      case 'EM_PREPARO':
        return 'PRONTO';
      case 'PRONTO':
        return 'A_CAMINHO';
      case 'A_CAMINHO':
        return 'ENTREGUE';
      default:
        return null;
    }
  };

  const getButtonLabel = (status: string) => {
    switch (status) {
      case 'PENDENTE':
        return 'Confirmar Pagamento';
      case 'EM_PREPARO':
        return 'Marcar como Pronto';
      case 'PRONTO':
        return 'Enviar para Entrega';
      case 'A_CAMINHO':
        return 'Confirmar Entrega';
      default:
        return null;
    }
  };

  const handleAvancarStatus = async () => {
    try {
      const proximoStatus = getNextStatus(statusAtual);
      if (!proximoStatus) return;

      const pedidoService = new PedidoService();

      if (statusAtual === 'PENDENTE') {
        const pagamentoService = new PagamentoService();
        await pagamentoService.confirmarPagamento(id);
      }

      await pedidoService.updatePedidoStatus(id, proximoStatus);
      setStatusAtual(proximoStatus);

      alert(`Status atualizado para ${proximoStatus}!`);
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      alert('Erro ao atualizar o status.');
    }
  };

  return (
    <Container>
      <Row>
        <p>Pedido Nº{id}</p>
        <p>{statusAtual}</p>
      </Row>
      <Row>
        <p>Cliente</p>
        <p>--</p>
      </Row>
      <Row>
        <p>Endereço</p>
        <p>{endereco}</p>
      </Row>
      <Line />

      <h3>Itens</h3>
      {itens.map((itemPedido, index) => (
        <div key={index}>
          <ItemCard>
            <p id="itemQuantidade">
              {itemPedido.quantidade}x {itemPedido.item.nome}
            </p>
            <p id="itemPreco">
              R$ {(itemPedido.item.preco * itemPedido.quantidade).toFixed(2)}
            </p>
          </ItemCard>

          {itemPedido.ingredientesPersonalizados?.map(
            (idIngrediente, subIndex) => (
              <ItemCard key={`${index}-acomp-${subIndex}`}>
                <p id="itemQuantidade">
                  - {nomesIngredientes[idIngrediente] || 'Acompanhamento'}
                </p>
                <p id="itemPreco">--</p>
              </ItemCard>
            ),
          )}
        </div>
      ))}

      <Line />

      <div id="PagamentoInfo">
        <Row>
          <p>Total</p>
          <p>R$ {preco.toFixed(2)}</p>
        </Row>

        <Row>
          <p>Forma de pagamento</p>
          <p>Pix</p>
        </Row>
      </div>

      <Line />
      {statusAtual !== 'ENTREGUE' && (
        <Button type="green" onClick={handleAvancarStatus}>
          {getButtonLabel(statusAtual)}
        </Button>
      )}
    </Container>
  );
}
