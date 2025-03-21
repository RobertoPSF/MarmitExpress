import { useState } from 'react';
import { Container, Information, Open, StyledIcon, Title } from './styles';

interface Restaurante {
  id: string | number;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  // avaliacoes: number[];
}

interface RestauranteCardProps {
  dados: Restaurante;
}

export default function RestauranteCard({ dados }: RestauranteCardProps) {
  // Calcula a média das avaliações
  // const calcularMediaAvaliacoes = (avaliacoes: number[]) => {
  //   if (avaliacoes.length === 0) return 'Sem avaliações';
  //   const total = avaliacoes.reduce((acc, nota) => acc + nota, 0);
  //   return (total / avaliacoes.length).toFixed(1);
  // };

  const [isOpen] = useState<boolean>(false);

  return (
    <Container>
      <StyledIcon icon={'material-symbols:store-outline-rounded'} />
      <Information>
        <Title>
          <h3>{dados.nome}</h3>
          <Open $isOpen={isOpen} />
        </Title>
        {/*
        <div id='avaliacoes'>
          <StyledIcon icon="emojione:star" />
          <p>{dados.avaliacoes.toFixed(1)}</p>
        </div>*/}

        <p id="descricao">{dados.descricao}</p>
        {/*
        <div id='fidelidade'>
          <Presente />
          <p>Programa de fidelidade</p>
          <StyledIcon icon={"material-symbols-light:verified"} id='verificado'/>
        </div>
         */}
      </Information>
    </Container>
  );
}
