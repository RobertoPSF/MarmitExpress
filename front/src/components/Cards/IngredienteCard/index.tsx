import { Container, StyledIcon } from './styles';

interface Ingrediente {
  nome: string;
}

interface IngredienteCardProps {
  dados: Ingrediente | null;
  onClick: () => void;
  isSelected: boolean;
}

export default function IngredienteCard({
  dados,
  onClick,
  isSelected,
}: IngredienteCardProps) {
  if (!dados) {
    return <p>Ingrediente não encontrado.</p>;
  }

  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <StyledIcon icon={'ep:food'} />
      <p>{dados.nome}</p>
    </Container>
  );
}
