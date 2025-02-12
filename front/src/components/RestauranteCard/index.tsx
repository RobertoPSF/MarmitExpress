import { Container, Imagem, Presente, Verificado, StyledIcon } from "./styles"
import BlankCard from "../BlankCard"


interface Restaurante {
  nome: string;
  imagem: string;
  estrelas: number;
  descricao: string;
  fidelidade: boolean;
}

export default function RestauranteCard() {

  const restaurante: Restaurante = {
    nome: "Casa Galiotto",
    imagem: "URL da Imagem",
    estrelas: 5.0,
    descricao: "Aberto das 10h as 13h",
    fidelidade: true, 
  };

  return (
    <BlankCard>
      <Container>
        <div className="mainContainer">

        <Imagem />
          <div>
              <p id="nomeRestaurante">{restaurante.nome}</p>
              <div className="avaliacao">
                <StyledIcon icon={"emojione:star"}/>
                <p>{restaurante.estrelas}</p>
              </div>
              <p id="horarioFuncionamento">Aberto das 10h as 13h</p>

              <div className="programaFidelidade">
                <Presente />
                <p>Programa de Fidelidade</p>
                <Verificado />
              </div>
          </div>
        </div>
      </Container>
    </BlankCard>
  )
}
