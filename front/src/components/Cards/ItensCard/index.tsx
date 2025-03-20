import { Container, Imagem } from './styles';

interface ItemCardProps {
  imagem: string;
  nome: string;
  valor: number;
}

export default function RestauranteCard({
  imagem,
  nome,
  valor,
}: ItemCardProps) {
  return (
    <Container>
      <Imagem src={imagem} alt={nome} /> {/* Passando a URL da imagem */}
      <p>{nome}</p>
      <h3>R$ {valor}</h3>
    </Container>
  );
}
