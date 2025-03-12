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

const restaurantesMock = restaurante;

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
    itens: { produtoId: string; quantidade: number; precoUnitario: number }[];
  }[];
}

interface Pagamento {
  quantidade: number;
  tipoItem: string;
  preco: number;
}

interface PagamentoCardProps {
  dados: Pagamento;
}

export default function PagamentoCard({ dados }: PagamentoCardProps) {
  const { quantidade, tipoItem, preco } = dados;
  let valorSutotal = 0;
  let totalCalculado = 100.0;

  // Coloque o hook `useNavigate` dentro do componente
  const navigate = useNavigate();

  const handleConfirm = async () => {
    alert('Pedido concluído!');
    navigate('/restaurantes');
  };

  return (
    <Container>
      <p>seu pedido pendente</p>
      {/*IMPORT CARD RESTAURANTE*/}
      <RestauranteContent>
        <ImagemRestaurante />
        <h3 id="nomeRestaurante">NOME Restaurante</h3>
      </RestauranteContent>

      <Line />

      <h3>Itens</h3>

      <ItemCard>
        {/* IMAGEM DO RESTAURANTE */}
        <p id="itemQuantidade">{quantidade + 'X'}</p>
        <p id="itemTipo">{tipoItem}</p>
        <p id="itemPreco">{'R$ ' + preco}</p>
      </ItemCard>
      {/*LOGICA PARA INTES NO CARRINHO*/}

      <Line />
      <div id="PagamentoInfo">
        <Row>
          <p>Subtotal</p>
          <p>{valorSutotal}</p>
        </Row>

        <Row>
          <p>Valor da entrega</p>
          <p>{7}</p>
        </Row>

        <Row>
          <p>Forma de pagamento</p>
          <p>{'Pix'}</p>
        </Row>

        <Row>
          <p>Total</p>
          <p>{totalCalculado}</p>
        </Row>
      </div>

      <Button type={'orange'} onClick={handleConfirm}>
        Concluir Pedido
      </Button>
    </Container>
  );
}
