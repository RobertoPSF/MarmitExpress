import styled from 'styled-components';

interface ResponseProps {
  $isError?: boolean; // Definição explícita da prop para TypeScript
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 64.5vh;
  margin-top: 10px;
  padding: 0 15vw;
  width: 100%;
`;

export const StatusColumn = styled.div`
  display: flex;
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
