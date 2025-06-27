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
// import QRCode from 'react-qr-code';

interface Pagamento {
  id: string;
  clienteId: string;
  restauranteId: string;
  endereco: string;
  status: string;
  preco: number;
  pagamentoId?: string | null;
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
  const { preco, itens, restauranteId, pagamentoId } = dados;

  const [nomesIngredientes, setNomesIngredientes] = useState<
    Record<string, string>
  >({});
  const [restauranteNome, setRestauranteNome] =
    useState<string>('Carregando...');
  const [pixPayload, setPixPayload] = useState<string | null>(null);
  const [statusPagamento, setStatusPagamento] = useState<string | null>(null);
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

  useEffect(() => {
    async function fetchPayloadPix() {
      if (dados.pagamentoId) {
        try {
          const pagamentoService = new PagamentoService();
          const response = await pagamentoService.getPixPayload(
            dados.pagamentoId,
          );
          setPixPayload(response?.data?.payload || 'Payload indisponível');
        } catch (error) {
          console.error('Erro ao buscar payload do Pix:', error);
          setPixPayload('Erro ao carregar payload');
        }
      }
    }

    fetchPayloadPix();
  }, [dados.pagamentoId]);

  const handleGenPagamento = async () => {
    try {
      const dadosPedido = {
        descricao: `Pedido Nº${dados.id}`,
        idPedido: dados.id,
      };

      const pagamentoService = new PagamentoService();
      const response = await pagamentoService.createPagamento(dadosPedido);
      const responseStatusPagamento = await pagamentoService.getStatusPagamento(
        response?.data.id,
      );

      if (response?.data) {
        alert('Pagamento gerado com sucesso!');
        // Atualiza o estado local com o novo ID do pagamento
        setPixPayload(response.data.qrCode || null); // se vier com qrCode direto
        setStatusPagamento(responseStatusPagamento?.data || null); // se vier com qrCode direto
        dados.pagamentoId = response.data.id; // força o campo local para disparar o useEffect
      } else {
        alert('Erro ao gerar pagamento.');
      }
    } catch (error) {
      console.error('Erro ao gerar pagamento:', error);
      alert('Erro ao gerar pagamento.');
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
      alert('Erro ao cancelar o pedido.');
    }
  };

  return (
    <Container>
      <Row>
        <p>Pedido Nº{dados.id}</p>
        <p>{dados.status}</p>
      </Row>
      <Row>
        <p>Endereço</p>
        <p>{dados.endereco}</p>
      </Row>
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

      {dados.status === 'PENDENTE' && !pagamentoId && (
        <>
          <Button type={'orange'} onClick={handleGenPagamento}>
            Gerar Pagamento
          </Button>
          <p style={{ display: 'flex', justifyContent: 'center' }}>ou</p>
          <Button type="" onClick={handleCancel}>
            Cancelar Pedido
          </Button>
        </>
      )}

      {dados.status === 'PENDENTE' && pagamentoId && pixPayload && (
        <>
          <Line />
          <h3>Pix</h3>

          <Row>
            <h4>Código Copia e Cola:</h4>
            <p>Status do pagamento: {statusPagamento || 'Carregando...'}</p>
          </Row>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '8px',
              wordBreak: 'break-word',
            }}
          >
            {pixPayload}
          </pre>
        </>
      )}
    </Container>
  );
}
