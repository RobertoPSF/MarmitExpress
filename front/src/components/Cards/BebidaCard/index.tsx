import { Container, Image } from './styles';

interface Bebida {
  imagem: string;
  nome: string;
  valor?: number;
  descricao: string;
}

interface Props {
  dados: Bebida;
  onClick: () => void;
  isSelected: boolean;
}

const formatarMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

export default function BebidaCard({ dados, onClick, isSelected }: Props) {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <Image src={dados.imagem} alt={`Imagem da bebida ${dados.nome}`} />
      <div>
        <h3>{dados.nome}</h3>
        <p>{dados.descricao}</p>
        <p id="preco">R$ {formatarMoeda(dados.valor ?? 0)}</p>
      </div>
    </Container>
  );
}
