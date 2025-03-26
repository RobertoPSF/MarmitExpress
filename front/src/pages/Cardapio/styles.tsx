import styled from 'styled-components';
import RestauranteCardComponent from '../../components/Cards/RestauranteCardapioVisualization';

export const Container = styled.div`
  display: grid;
  justify-content: space-between;
  padding: 5vw;
  min-height: 64.5vh;
  width: 90vw;
  gap: 2vw;
  margin-top: -30vh;
  grid-template-columns: auto auto;

  @media (max-width: 999px) {
    grid-template-columns: auto;
    margin-top: -20vh;
    width: 100%;
    padding: 10vh;
  }
`;

export const ItensContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
  min-height: 64.5vh;
  height: max-content;

  @media (max-width: 999px) {
    margin-top: -8vh;
    grid-template-columns: auto;
    width: 100%;
  }
`;

export const RestauranteCard = styled(RestauranteCardComponent)`
  h1 {
    color: white;
  }
`;

export const ResumoContainer = styled.div`
  width: 25vw;
  margin-top: 16vh;
  @media (max-width: 999px) {
    margin-top: 0;
    grid-template-columns: auto;
    width: auto;
  }
`;

export const ResumoCompraPopup = styled.div`
  position: sticky;
  top: 100px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;

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

    &:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`;

export const Section = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 999px) {
    margin-top: 0;
    grid-template-columns: auto;
    width: 100%;
  }
`;
