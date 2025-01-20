import styled from 'styled-components';
import frase from "../../assets/frase-home.svg?react"

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35.5vh;
  padding-top: 10vh;
  background-color: #FCB827;
  color: white;
  border-radius: 0 0 30px 30px;

  h1 {
    margin-left: 10vw;
  }

  `;

export const Frase = styled(frase)`
  display: flex;
  height: 5rem;
  margin: auto;
`;
