import styled from 'styled-components';
import frase from '../../assets/frase-home.svg?react';
import logo from '../../assets/logo-marmitexpress.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div<{ $isHome: boolean,  $isCardapio: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ $isHome }) =>
    $isHome ? '50.5vh' : '37.5vh'}; /* Altura dinâmica */
  padding-top: 9.5vh;
  background-color: #24292e;
  color: white;

  h1 {
    margin-left: 12vw;
    margin-top: 7.5vh;
  }

  button {
    z-index: 900;
    display: flex;
    align-items: center;
    width: fit-content;
    margin-left: ${({ $isCardapio }) =>
      $isCardapio ? '6vw' : '12vw'};
    margin-top: ${({ $isCardapio }) =>
      $isCardapio ? '4vh' : '7.5vh'};
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: white;
    gap: 10px;

    h1 {
      margin: 0;
    }

    &:hover {
      text-decoration: underline;
      opacity: 0.6;
      transform: scale(1.05);
    }
  
    transition: all 0.2s ease-in-out;

  }
`;

export const Frase = styled(frase)`
  display: flex;
  width: 90%;
  margin-top: 4vh;
  justify-self: center;
  align-self: center;
  min-height: 12vh;
`;

export const Logo = styled(logo)`
  display: flex;
  align-self: center;
  position: absolute;
  height: 40%;
  max-width: 90%;
  z-index: 1;
  top: 50vh;
  bottom: 50vh;
`;

export const StyledIcon = styled(Icon)`
  color: #F6821F;
  background-color: white;
  border-radius: 50%;
  height: min-content;
  width: 30px;
`;
