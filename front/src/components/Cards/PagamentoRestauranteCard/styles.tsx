import styled from 'styled-components';
import IMG from '../../../assets/imageExemplo.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  min-width: 300px;
  width: 90%;
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  gap: 10px;
  height: 67.1vh;
  margin-top: -10vh;
  margin-bottom: 5vh;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  p {
    color: gray;
  }

  h3 {
    font-weight: 500;
  }
`;

export const RestauranteContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  #nomeRestaurante {
    margin-left: 1rem;
  }
`;

export const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  p {
    color: black;
  }

  #acompanhamento {
    margin-left: 1rem;
  }

  #itemQuantidade {
  }

  #itemTipo {
    margin-left: 0.5rem;
  }

  #itemPreco {
    display: flex;
    align-self: self-end;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Line = styled.div`
  border-bottom: 2px solid #f1f2f3;
  width: 100%;
`;

export const ImagemRestaurante = styled(IMG)`
  width: 7rem;
`;

export const StyledIcon = styled(Icon)`
  color: #24292e;
  background-color: #f1f2f3;
  border-radius: 7px;
  height: min-content;
  width: 100px;
`;
