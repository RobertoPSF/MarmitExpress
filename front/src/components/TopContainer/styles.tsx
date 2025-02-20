import styled from 'styled-components';
import frase from '../../assets/frase-home.svg?react';
import logo from '../../assets/logo-marmitexpress.svg?react';

export const Container = styled.div<{ $isHome: boolean }>`
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
