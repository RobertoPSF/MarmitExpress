import styled from 'styled-components';
import ImgCard from '../../../assets/marmita.svg?react';

export const Container = styled.div`
  align-items: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 0.5rem;
    font-weight: 500;
    margin: 0;
  }

  p {
    font-size: 0.4rem;
    color: #24292e;
    max-width: 75%;
  }

  #preco {
    margin-bottom: 0.5rem;
  }
  justify-content: left;
  margin: 50px;
`;

export const Imagem = styled(ImgCard)`
  max-width: 5rem;
  max-height: 5rem;
`;
