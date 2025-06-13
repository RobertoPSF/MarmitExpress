import styled from 'styled-components';

interface ResponseProps {
  $isError?: boolean; // Definição explícita da prop para TypeScript
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 71vh;
  padding: 1vh 15vw;
  width: 100%;
  margin-bottom: 10px;

  span {
    display: flex;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    border-radius: 5px;
    background-color: #FFCD9F;
    padding: 20px;
    line-height: 1.5;
  }
`;


export const StatusColumn = styled.div`
  display: flex;
  gap: 10px;
  div {
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  flex-direction: column;
  font-weight: bold;
`;

export const Response = styled.div<ResponseProps>`
  display: flex;
  border: 2px solid ${({ $isError }) => ($isError ? 'red' : 'green')};
  color: ${({ $isError }) => ($isError ? 'red' : 'green')};
  padding: 2px 5px;
  border-radius: 20px;
`;
