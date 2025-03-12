import { Container, Image } from './styles';

interface MarmitaCard {
  imagem: string;
  tamanho: string;
  valor: number;
  proteinas: number;
}

interface Props {
  dados: MarmitaCard;
  onClick: () => void;
  isSelected: boolean;
}

export default function TamanhoMarmitaCard({ dados, onClick, isSelected}: Props) {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <Image src={dados.imagem} alt={`Imagem da marmita ${dados.tamanho}`} />
        <h3>Marmita ({dados.tamanho})</h3>
        <p>Todos os acompanhamentos</p>
        <p> + {dados.proteinas} carnes</p>
        <h3 id="preco">R$ {dados.valor}</h3>
    </Container>
  );
}
