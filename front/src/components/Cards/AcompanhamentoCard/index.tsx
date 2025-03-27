import { Container, StyledIcon } from './styles';

interface Item {
  nome: string;
  descricao: string;
}

interface Props {
  dados: Item;
  onClick: () => void;
  isSelected: boolean;
}

export default function ItemCard({ dados, onClick, isSelected }: Props) {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <StyledIcon icon={'ep:food'} style={{ fontSize: 30 }} />
      <h3>{dados.nome}</h3>
    </Container>
  );
}
