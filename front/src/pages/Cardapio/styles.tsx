import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
`;

export const ItensContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 17.5vh;
  padding-top: 40px;
  width: 70%;
  min-height: 64.5vh;
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

export const ResumoContainer = styled.div`
  width: 30%;
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

export const DivItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const ResumoCompraPopup = styled.div`
  position: sticky;
  top: 100px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1000;

  h2 {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  hr {
    border: 0;
    border-top: 1px solid #f6821f;
    margin: 10px 0;
  }

  p {
    color: #24292e;
    font-size: 1em;
    margin: 5px 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      color: #24292e;
      font-size: 1em;
      margin: 5px 0;
      display: flex;
      justify-content: space-between;

      button {
        background: none;
        border: none;
        color: #db5807;
        cursor: pointer;
        font-size: 0.9em;
      }
    }
  }

  button.finalizar-compra {
    background-color: #f6821f;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;
    padding: 10px;
    width: 100%;
  }
`;
