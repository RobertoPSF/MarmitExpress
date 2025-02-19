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
  background-color: #fcb827;
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
  justify-content: center;
  min-height: 12vh;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5.5vh;
`;

export const LogoContainer = styled.div`
  align-content: center;
  align-self: center;
  background-color: #fafbfc;
  border-radius: 100%;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.2);
  justify-content: center;
  min-height: 40vh;
  min-width: 40vh;
`;

export const Logo = styled(logo)`
  display: flex;
  justify-self: center;
  width: auto;
  height: 25vh;
  margin-bottom: 10%;
`;
