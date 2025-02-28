import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
  h1 {
    text-align: left;
  }
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 17.5vh;
  padding-top: 40px;
  width: 100%;
  height: max-content;
`;

export const DivTamanhoMarmita = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: baseline;
  gap: 2vw;
  width: 55vw;

  @media (max-width: 999px) {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;

export const DivProteinas = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: baseline;
  gap: 2vw;
  width: 55vw;

  @media (max-width: 999px) {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;

export const DivBebidas = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: baseline;
  gap: 2vw;
  width: 55vw;

  @media (max-width: 999px) {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;

export const DivSobremesas = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: baseline;
  gap: 2vw;
  width: 55vw;

  @media (max-width: 999px) {
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;
