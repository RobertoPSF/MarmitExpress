import {
  Container,
  StyledIcon,
  Footer,
  Header,
  Informations,
  Line,
} from './styles';

interface Pedido {
  id: string;
  restauranteId: string;
  status: string;
  precoTotal: number;
  itensIds: [];
}

interface restaurante {
  nome: string;
}

interface PedidoCardProps {
  dados: Pedido | null;
}

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor,
  );

export default function PedidoCard({ dados }: PedidoCardProps) {
  if (!dados) {
    return <p>Pedido não encontrado.</p>;
  }

  return (
    <Container>
      <Header>
        <Informations>
          <p id="nomeRestaurante">Pedido no(a): {dados.restauranteId}</p>
          {/* <p id="dataPedido">{dados.dataDoPedido}</p> */}
          {/*Aqui tem outra data que não sei se é o horario que foi feito ou a hora da entrega*/}
          <p id="totalPedido">Total: {formatarMoeda(dados.precoTotal)}</p>
        </Informations>

        <StyledIcon icon={'material-symbols-light:keyboard-arrow-right'} />
      </Header>
      <Line />
      <Footer>
        <p>{dados.status}</p>
        {/* <p>{dados.dataDoPedido}</p> */}
        {/*Se for tirar uma data tira essa e deixa só o status do pedido no footer*/}
      </Footer>
    </Container>
  );
}
