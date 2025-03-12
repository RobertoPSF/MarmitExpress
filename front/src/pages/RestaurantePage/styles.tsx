import styled from 'styled-components';

export const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 120px;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 17.5vh;
  padding-top: 40px;
  padding-left: 60px;
  padding-right: 60px; 
  width: 100%;
  height: max-content;

  @media (max-width: 999px) {
    margin-top: 10vh;
    padding-top: 20px;
    gap: 30px;
    padding-left: 45px;
    padding-right: 45px;
  }

  @media (max-width: 600px) {
    margin-top: 5vh;
    padding-top: 10px;
    gap: 20px;
    padding-left: 30px; 
    padding-right: 30px; 
  }
`;

export const DivTamanhoMarmita = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: left;
  gap: 0vw;
  width: 100%;

  h1 {
    text-align: left;
    width: 100%;
    padding-left: 50px;
  }

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

export const DivAcompanhamentos = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: left;
  gap: 2vw;
  width: 100%;

  h1 {
    text-align: left;
    width: 100%;
    padding-left: 50px;
  }

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
  justify-content: left;
  gap: 2vw;
  width: 100%;

  h1 {
    text-align: left;
    width: 100%;
    padding-left: 50px;
  }

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

export const DivBebidas = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: left;
  gap: 2vw;
  width: 100%;

  h1 {
    text-align: left;
    width: 100%;
    padding-left: 50px;
  }

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

export const DivSobremesas = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: min-content;
  justify-content: left;
  gap: 2vw;
  width: 100%;

  h1 {
    text-align: left;
    width: 100%;
    padding-left: 50px;
  }

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

