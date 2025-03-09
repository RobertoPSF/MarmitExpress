import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
  h1 {
    text-align: center;
  }
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 17.5vh;
  padding-top: 40px;
  width: 100%;
  height: max-content;

  @media (max-width: 999px) {
    margin-top: 10vh;
    padding-top: 20px;
    gap: 30px;
  }

  @media (max-width: 600px) {
    margin-top: 5vh;
    padding-top: 10px;
    gap: 20px;
  }
`;

export const DivTamanhoMarmita = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: min-content;
  justify-content: center;
  gap: 2vw;
  width: 100%;

  @media (max-width: 999px) {
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  @media (max-width: 600px) {
    gap: 10px;
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
