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
import PedidoService from '../../../services/PedidoService';
import PagamentoService from '../../../services/PagamentoService';
import IngredienteService from '../../../services/IngredienteService';

interface Pagamento {
  id: string;
  clienteId: string;
  restauranteId: string;
  status: string;
  preco: number;
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

export default function PagamentoCard({ dados }: PagamentoCardProps) {
  const { preco, itens, restauranteId } = dados;
  const [nomesIngredientes, setNomesIngredientes] = useState<
    Record<string, string>
  >({});
  const [restauranteNome, setRestauranteNome] =
    useState<string>('Carregando...');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNomesIngredientes() {
      try {
        const ids = itens
          .flatMap((item) => item.ingredientesPersonalizados || [])
          .filter((id, i, arr) => id && arr.indexOf(id) === i); // remove duplicados

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

  useEffect(() => {
    async function fetchRestaurante() {
      try {
        const restauranteService = new RestauranteService();
        const response =
          await restauranteService.getRestaurantById(restauranteId);
        setRestauranteNome(response?.data?.nome || 'Restaurante Desconhecido');
      } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        setRestauranteNome('Restaurante Desconhecido');
      }
    }

    if (restauranteId) {
      fetchRestaurante();
    }
  }, [restauranteId]);

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

      if (response?.data) {
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

      <RestauranteContent>
        <StyledIcon icon={'material-symbols:store-outline-rounded'} />
        <h3 id="nomeRestaurante">{restauranteNome}</h3>
      </RestauranteContent>

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

          {/* Verifica se há acompanhamentos */}
          {itemPedido.ingredientesPersonalizados &&
            itemPedido.ingredientesPersonalizados.length > 0 && (
              <>
                {itemPedido.ingredientesPersonalizados.map(
                  (idIngrediente, subIndex) => (
                    <ItemCard key={`${index}-acomp-${subIndex}`}>
                      <p id="acompanhamento">
                        - {nomesIngredientes[idIngrediente] || 'Acompanhamento'}
                      </p>
                      <p id="itemPreco">--</p>
                    </ItemCard>
                  ),
                )}
              </>
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
