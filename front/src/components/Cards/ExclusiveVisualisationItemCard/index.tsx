import { Container, Information, StyledIcon} from './styles';

interface Item {
  nome: string;
  preco: number;
}

interface ItemCardProps {
  dados: Item | null;
  onClick: () => void;
  isSelected: boolean;
}

const formatarMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

export default function ItemCard({ dados, onClick, isSelected  }: ItemCardProps) {
  if (!dados) {
    return <p>Item não encontrado.</p>;
  }

  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <StyledIcon icon={'material-symbols:store-outline-rounded'} />
      <Information>
        <p>{dados.nome}</p>
      </Information>
      <h3>{formatarMoeda(dados.preco)}</h3>
    </Container>
  );
}
