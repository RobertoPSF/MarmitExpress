import styled from 'styled-components'
import ImgCard from '../../../assets/guarana.svg?react'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  margin: 50px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  align-items: center;

  h3{
    font-size: 0.5rem;
    font-weight: 500;
    margin: 0;
  }

  p{
    font-size: 0.4rem;
    color: #24292E;
    max-width: 75%;
  }

  #preco{
    margin-bottom: 0.5rem;
  }

`;

export const Imagem = styled(ImgCard)`
  max-width: 5rem;
  max-height: 5rem;
`;
