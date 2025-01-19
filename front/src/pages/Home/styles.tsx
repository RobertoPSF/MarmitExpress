import logo from '../../assets/logo-marmitexpress.svg?react';
import styled from 'styled-components'
import frase from "../../assets/frase-home.svg?react"

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Logo = styled(logo)`
  height: 12rem;
  width: auto;
`;

export const TopContainer = styled.div`
  display: flex;
  height: 26vh;
  width: 100%;
  background-color: #FCB827;
  border-radius: 0 0 30px 30px;
  flex-direction: column;
  justify-content: center;
  color: #FFFFFF;  
  @media (max-width: 768px) {
    padding: 100px 5%;
  }
  `;

export const Frase = styled(frase)`
  height: 6rem;
  width: auto;
`;