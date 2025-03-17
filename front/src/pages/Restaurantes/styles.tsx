import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
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
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 120px;
  gap: 2vw;
  width: 53vw;

  @media (max-width: 999px) {
    grid-template-columns: auto;
    gap: 20px;
    width: 100%;
  }
`;
