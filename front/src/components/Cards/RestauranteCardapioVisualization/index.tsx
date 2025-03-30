import { useState } from 'react';
import { Container, Information, Open, StyledIcon } from './styles';

interface Restaurante {
  nome: string;
  aceitandoPedidos: boolean;
  endereco: string;
}

interface RestauranteCardProps {
  dados: Restaurante | null;
  className?: string;
  style?: React.CSSProperties; // Adicionando a prop style
}

function RestauranteCardapioVisualization({
  dados,
  className,
  style,
}: RestauranteCardProps) {
  if (!dados) {
    return <p>Restaurante não encontrado.</p>;
  }

  const [isOpen] = useState<boolean>(dados.aceitandoPedidos);

  return (
    <Container className={className}>
      <StyledIcon icon={'material-symbols:store-outline-rounded'} />
      <Information>
        <h2 style={{ color: style?.color || 'white' }}>{dados.nome}</h2>
        <p style={{ color: style?.color || 'white' }}>{dados.endereco}</p>
        <Open $isOpen={isOpen}>{isOpen ? 'Aberto' : 'Fechado'}</Open>
      </Information>
    </Container>
  );
}

export default RestauranteCardapioVisualization;
