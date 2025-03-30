import { Container, Information, StyledIcon } from './styles';

interface Marmita {
  nome: string;
  preco: number;
}

interface MarmitaCardProps {
  dados: Marmita | null;
  onClick: () => void;
  isSelected: boolean;
}

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor,
  );

export default function MarmitaCard({
  dados,
  onClick,
  isSelected,
}: MarmitaCardProps) {
  if (!dados) {
    return <p>Mrmita não encontrado.</p>;
  }

  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <StyledIcon icon={'ph:bowl-food'} />
      <Information>
        <p>{dados.nome}</p>
      </Information>
      <h3>{formatarMoeda(dados.preco)}</h3>
    </Container>
  );
}
