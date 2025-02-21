import { Container, Img, Information } from './styles';

interface Restaurante {
  id: number;
  nome: string;
  imagem: string;
  estrelas: number;
  horario: string;
  fidelidade: boolean;
}

export default function RestauranteCard() {
  const restaurante: Restaurante = {
    id: 1,
    nome: 'Casa Galiotto',
    imagem: 'URL da Imagem',
    estrelas: 4.4,
    horario: 'Aberto das 10h as 13h',
    fidelidade: true,
  };

  return (
    <Container>
      <Img />
      <Information>
        <h3>{restaurante.nome}</h3>
      </Information>
    </Container>
  );
}
