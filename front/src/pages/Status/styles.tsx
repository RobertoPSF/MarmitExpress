import styled from 'styled-components';

interface ResponseProps {
  $isError?: boolean; // Definição explícita da prop para TypeScript
}

export const Container = styled.div`
  height: 64.5vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 10px;
  padding-left: 15vw;
`;

export const StatusColumn = styled.div`
  display: flex;
  font-weight: bold;
  flex-direction: column;
  
  p {
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const Response = styled.div<ResponseProps>` 
  display: flex;
  border: 2px solid ${({ $isError }) => ($isError ? "red" : "green")};
  color: ${({ $isError }) => ($isError ? "red" : "green")};
  padding: 2px 5px;
  border-radius: 20px;
`;
