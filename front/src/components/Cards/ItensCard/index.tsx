import { Container, Imagem } from './styles';

interface ItemCard {
  imagem: string;
  nome: string;
  valor: number;
}

export default function RestauranteCard() {
  const item: ItemCard = {
    imagem: 'URL da Imagem',
    nome: 'Coca pet',
    valor: 19,
  };

  return (
    <Container>
      <Imagem />
      <p>{item.nome}</p>
      <h3>R$ {item.valor}</h3>
    </Container>
  );
}
