import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10vh;
  margin-top: -7vh;
  min-height: 64.5vh;
  width: 86vw;

  @media (max-width: 999px) {
    flex-direction: column;
    width: 90%;
    height: auto;
  }
`;

export const DivRestaurantes = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: space-evenly;
  gap: 2vw;
  width: 55vw;

  @media (max-width: 999px) {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;
