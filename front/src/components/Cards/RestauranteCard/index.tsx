import { Container, Imagem, Presente, Verificado, StyledIcon } from './styles';

interface Restaurante {
  nome: string;
  imagem: string;
  estrelas: number;
  horario: string;
  fidelidade: boolean;
}

export default function RestauranteCard() {
  const restaurante: Restaurante = {
    nome: 'Casa Galiotto',
    imagem: 'URL da Imagem',
    estrelas: 4.4,
    horario: 'Aberto das 10h as 13h',
    fidelidade: true,
  };

  return (
    <Container>
      <div className="mainContainer">
        <Imagem />
        <div>
          <p id="nomeRestaurante">{restaurante.nome}</p>
          <div className="avaliacao">
            <StyledIcon icon={'emojione:star'} />
            <p>{restaurante.estrelas}</p>
          </div>
          <p id="horarioFuncionamento">{restaurante.horario}</p>

          <div className="programaFidelidade">
            <Presente />
            <p>Programa de Fidelidade</p>
            <Verificado />
          </div>
        </div>
      </div>
    </Container>
  );
}
