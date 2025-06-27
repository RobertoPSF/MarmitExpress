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
  endereco: string;
  status: string;
  preco: number;
  itensIds: [];
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
    <Container to={`/pedidos/${dados.id}`}>
      <Header>
        <Informations>
          <p id="nomeRestaurante">Pedido Nº: {dados.id}</p>
          {/* <p id="dataPedido">{dados.dataDoPedido}</p> */}
          {/*Aqui tem outra data que não sei se é o horario que foi feito ou a hora da entrega*/}
          <p id="totalPedido">Total: {formatarMoeda(dados.preco)}</p>
          <p id="totalPedido">Entrega: {dados.endereco}</p>
        </Informations>

        <StyledIcon icon={'material-symbols-light:keyboard-arrow-right'} />
      </Header>
      <Line />
      <Footer>
        <p><b>{dados.status}</b></p>
        {/* <p>{dados.dataDoPedido}</p> */}
        {/*Se for tirar uma data tira essa e deixa só o status do pedido no footer*/}
      </Footer>
    </Container>
  );
}
