import { Container, Image } from './styles';

interface MarmitaCard {
  imagem: string;
  tamanho: string;
  valor: number;
  proteinas: number;
}

interface Props {
  dados: MarmitaCard;
}

export default function TamanhoMarmitaCard({ dados }: Props) {
  return (
    <Container>
      <Image src={dados.imagem} alt={`Imagem da marmita ${dados.tamanho}`} />
        <h3>Marmita ({dados.tamanho})</h3>
        <p>Todos os acompanhamentos</p>
        <p> + {dados.proteinas} carnes</p>
        <h3 id="preco">R$ {dados.valor}</h3>
    </Container>
  );
}
