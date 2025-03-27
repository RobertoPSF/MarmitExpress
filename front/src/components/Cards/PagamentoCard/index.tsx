import {
  Container,
  RestauranteContent,
  ImagemRestaurante,
  Row,
  Line,
  ItemCard,
} from './styles';
import Button from '../../Button';
import restaurante from '../../../data/restaurantes.json';
import { useNavigate } from 'react-router-dom';

interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  chavePix: string;
  itens: { id: string; nome: string; preco: number; quantidade: number }[];
  pedidos: {
    id: string;
    clienteId: string;
    status: string;
    dataHora: string;
    valorTotal: number;
    itens: { ItemId: string; quantidade: number; precoUnitario: number }[];
  }[];
}

interface Item {
  nome: string;
  valor?: number;
}

interface Pagamento {
  quantidade: number;
  tipoItem: string;
  preco: number;
  itens: Item[];
}

interface PagamentoCardProps {
  dados: Pagamento;
}

export default function PagamentoCard({ dados }: PagamentoCardProps) {
  const { quantidade, tipoItem, preco, itens } = dados;
  const valorEntrega = 7.0;
  const totalCalculado = preco + valorEntrega;

  const navigate = useNavigate();

  const handleConfirm = async () => {
    alert('Pedido concluído!');
    navigate('/restaurantes');
  };

  return (
    <Container>
      <p>Seu pedido pendente</p>

      {/* Informações do Restaurante */}
      <RestauranteContent>
        <ImagemRestaurante />
        <h3 id="nomeRestaurante">Nome do Restaurante</h3>
      </RestauranteContent>

      <Line />

      <h3>Itens</h3>

      {itens.map((item, index) => {
        const precoItem = item.valor || 0.0;
        return (
          <ItemCard key={index}>
            <p id="itemQuantidade">1x {item.nome}</p>
            {precoItem === 0.0 ? (
              <p>Complemento</p>
            ) : (
              <p id="itemPreco">R$ {precoItem.toFixed(2)}</p>
            )}
          </ItemCard>
        );
      })}

      <Line />

      {/* Resumo de Pagamento */}
      <div id="PagamentoInfo">
        <Row>
          <p>Subtotal</p>
          <p>R$ {preco.toFixed(2)}</p>
        </Row>

        <Row>
          <p>Valor da entrega</p>
          <p>R$ {valorEntrega.toFixed(2)}</p>
        </Row>

        <Row>
          <p>Forma de pagamento</p>
          <p>Pix</p>
        </Row>

        <Row>
          <p>Total</p>
          <p>R$ {totalCalculado.toFixed(2)}</p>
        </Row>
      </div>

      <Button type={'orange'} onClick={handleConfirm}>
        Concluir Pedido
      </Button>
    </Container>
  );
}
