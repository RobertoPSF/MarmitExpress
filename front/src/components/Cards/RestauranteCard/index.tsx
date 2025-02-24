import { Container, Img, Information } from './styles';

interface Restaurante {
  id: number;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  avaliacoes: number[];
}

interface RestauranteCardProps {
  dados: Restaurante;
}

export default function RestauranteCard({ dados }: RestauranteCardProps) {
  // Calcula a média das avaliações
  const calcularMediaAvaliacoes = (avaliacoes: number[]) => {
    if (avaliacoes.length === 0) return 'Sem avaliações';
    const total = avaliacoes.reduce((acc, nota) => acc + nota, 0);
    return (total / avaliacoes.length).toFixed(1);
  };

  return (
    <Container>
      <Img />
      <Information>
        <h3>{dados.nome}</h3>
        <p>
          Status: {dados.aceitandoPedidos ? 'Aceitando pedidos' : 'Fechado'}
        </p>
        <p>Avaliação: {calcularMediaAvaliacoes(dados.avaliacoes)}</p>
      </Information>
    </Container>
  );
}
