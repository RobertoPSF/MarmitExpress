import styled from 'styled-components';
import ImgCard from '../../../assets/marmita.svg?react';

export const Container = styled.div`
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  width: 300px; /* Aumenta a largura do card */
  height: 300px; /* Aumenta a altura do card */
  padding: 20px; /* Adiciona padding ao card */
  position: relative; /* Adiciona posição relativa ao card */
  
  h3 {
    font-size: 1rem; /* Aumenta o tamanho da fonte do título */
    font-weight: 500;
    margin: 0;
  }

  p {
    font-size: 0.8rem; /* Aumenta o tamanho da fonte do parágrafo */
    color: #24292e;
    max-width: 75%;
  }

  #preco {
    position: absolute; /* Adiciona posição absoluta ao preço */
    bottom: 20px; /* Posiciona o preço no fundo */
    right: 20px; /* Posiciona o preço à esquerda */
    font-size: 1rem; /* Aumenta o tamanho da fonte do preço */
  }
  justify-content: center;
  margin: 50px;
`;

export const Image = styled.img`
  max-width: 10rem; /* Aumenta a largura máxima da imagem */
  max-height: 10rem; /* Aumenta a altura máxima da imagem */
  margin-bottom: 20px; /* Adiciona margem inferior à imagem */
`;
