import logo from '../../assets/logo-marmitexpress.svg?react';
import frase from "../../assets/frase-home.svg?react"
import styled from 'styled-components'

export const Container = styled.div`
  height: 64.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Logo = styled(logo)`
  height: 17rem;
  width: auto;
`;

export const TopContainer = styled.div`
  display: flex;
  height: 36vh;
  padding-top: 10vh;
  width: 100%;
  background-color: #FCB827;
  border-radius: 0 0 30px 30px;
  justify-content: center;
  `;

export const Frase = styled(frase)`
  align-self: center;
  margin: 5%;
  height: 5rem;
  width: auto;
`;