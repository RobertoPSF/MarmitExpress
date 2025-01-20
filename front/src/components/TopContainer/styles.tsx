import styled from 'styled-components';
import frase from "../../assets/frase-home.svg?react"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35.5vh;
  padding-top: 10vh;
  background-color: #FCB827;
  border-radius: 0 0 30px 30px;
  `;

export const Frase = styled(frase)`
  margin: 5%;
  height: 5rem;
  width: auto;
`;
