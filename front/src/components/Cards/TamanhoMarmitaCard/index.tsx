import { Container, Imagem } from './styles';

interface MarmitaCard {
  imagem: string;
  tamanho: string;
  valor: number;
}

export default function RestauranteCard() {
  const marmita: MarmitaCard = {
    imagem: 'URL da Imagem',
    tamanho: 'G',
    valor: 19,
  };

  return (
    <Container>
      <Imagem />
      <h3>Marmita ({marmita.tamanho})</h3>
      <p>Todos os acompanhamentos + 2 carnes</p>
      <h3 id="preco">R$ {marmita.valor}</h3>
    </Container>
  );
}
