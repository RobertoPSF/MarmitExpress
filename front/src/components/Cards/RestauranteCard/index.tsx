import { useState } from 'react';
import { Container, Information, Open, StyledIcon } from './styles';

interface Restaurante {
  nome: string;
  aceitandoPedidos: boolean;
  endereco: string;
  descricao: string;
}

interface RestauranteCardProps {
  dados: Restaurante | null;
  className?: string;
}

function RestauranteCard({ dados, className }: RestauranteCardProps) {
  if (!dados) {
    return <p>Restaurante não encontrado.</p>;
  }

  const [isOpen] = useState<boolean>(dados.aceitandoPedidos);

  return (
    <Container className={className}>
      <StyledIcon icon={'material-symbols:store-outline-rounded'} />
      <Information>
        <h2>{dados.nome}</h2>
        <p>{dados.endereco}</p>
        <p>{dados.descricao}</p>
        <Open $isOpen={isOpen}>{isOpen ? 'Aberto' : 'Fechado'}</Open>
      </Information>
    </Container>
  );
}

export default RestauranteCard;
