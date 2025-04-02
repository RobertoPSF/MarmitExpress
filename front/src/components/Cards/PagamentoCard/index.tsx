import {
  Container,
  RestauranteContent,
  Row,
  Line,
  ItemCard,
  StyledIcon,
} from './styles';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RestauranteService from '../../../services/RestauranteService';
import ItemService from '../../../services/ItemService';
import PedidoService from '../../../services/PedidoService';
import PagamentoService from '../../../services/PagamentoService';

interface Pagamento {
  id: string;
  clienteId: string;
  restauranteId: string;
  status: string;
  quantidade: number;
  preco: number;
  itens: { id?: string; nome?: string; valor?: number }[]; // ID pode estar indefinido
}

interface PagamentoCardProps {
  dados: Pagamento;
}

export default function PagamentoCard({ dados }: PagamentoCardProps) {
  const { preco, itens, restauranteId } = dados;
  const [restauranteNome, setRestauranteNome] =
    useState<string>('Carregando...');
  const [itensDetalhados, setItensDetalhados] = useState<
    { nome: string; valor: number }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRestaurante() {
      try {
        const restauranteService = new RestauranteService();
        const response =
          await restauranteService.getRestaurantById(restauranteId);

        if (response && response.data) {
          setRestauranteNome(response.data.nome);
        } else {
          setRestauranteNome('Restaurante Desconhecido');
        }
      } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        setRestauranteNome('Restaurante Desconhecido');
      }
    }

    if (restauranteId) {
      fetchRestaurante();
    }
  }, [restauranteId]);

  useEffect(() => {
    async function fetchItens() {
      try {
        const itemService = new ItemService();
        const detalhes = await Promise.all(
          itens.map(async (item) => {
            // Se já tivermos um nome válido, usamos ele
            if (item.nome && !item.nome.startsWith('Item ')) {
              return { nome: item.nome, valor: item.valor || 0 };
            }

            // Se não houver ID, não podemos buscar no backend
            if (!item.id) {
              console.warn('Item sem ID:', item);
              return { nome: 'Item Desconhecido', valor: item.valor || 0 };
            }

            // Buscando pelo ID
            const response = await itemService.getItemById(item.id);
            return response?.data
              ? {
                  nome: response.data.nome,
                  valor: item.valor || response.data.preco,
                }
              : { nome: 'Item Desconhecido', valor: item.valor || 0 };
          }),
        );

        setItensDetalhados(detalhes);
      } catch (error) {
        console.error('Erro ao buscar detalhes dos itens:', error);
        setItensDetalhados(
          itens.map(() => ({ nome: 'Item Desconhecido', valor: 0 })),
        );
      }
    }

    if (itens.length > 0) {
      fetchItens();
    }
  }, [itens]);

  const handleGenPagamento = async () => {
    try {
      if (!dados.id) {
        alert('Erro: ID do pedido não encontrado.');
        return;
      }

      const dadosPedido = {
        descricao: `Pedido Nº${dados.id}`,
        idPedido: dados.id,
      };

      const pagamentoService = new PagamentoService();
      const response = await pagamentoService.createPagamento(dadosPedido);

      if (response && response.data) {
        alert('Gerado pagamento para Pedido!');
        navigate(`/pagamento/${response.data.id}`);
      } else {
        alert('Erro ao gerar pagamento. Resposta inválida.');
      }
    } catch (error) {
      console.error('Erro ao gerar pagamento para Pedido:', error);
      alert('Erro ao gerar pagamento para Pedido. Tente novamente.');
    }
  };

  const handleCancel = async () => {
    try {
      const pedidoService = new PedidoService();
      await pedidoService.cancelPedido(dados.id);

      alert('Pedido cancelado com sucesso!');
      navigate('/restaurantes');
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      alert('Erro ao cancelar o pedido. Tente novamente.');
    }
  };

  return (
    <Container>
      <p>Pedido Nº{dados.id}</p>

      {/* Informações do Restaurante */}
      <RestauranteContent>
        <StyledIcon icon={'material-symbols:store-outline-rounded'} />
        {/* <ImagemRestaurante /> */}
        <h3 id="nomeRestaurante">{restauranteNome}</h3>
      </RestauranteContent>

      <Line />

      <h3>Itens</h3>

      {itensDetalhados.map((item, index) => (
        <ItemCard key={index}>
          <p id="itemQuantidade">1x {item.nome}</p>
          <p id="itemPreco">R$ {item.valor.toFixed(2)}</p>
        </ItemCard>
      ))}

      <Line />

      {/* Resumo de Pagamento */}
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

      <Button type={'orange'} onClick={handleGenPagamento}>
        Gerar Pagamento
      </Button>
      <p style={{ display: 'flex', justifyContent: 'center' }}>ou</p>
      <Button onClick={handleCancel} type={''}>
        Cancelar Pedido
      </Button>
    </Container>
  );
}
