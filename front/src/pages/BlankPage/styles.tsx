import styled from 'styled-components';

export const Container = styled.div`
  height: 200vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 10px;
  padding-left: 15vw;
  justify-content: center;
  align-items: center;
`;

export const OpenButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;

  &:hover {
    background-color: #0056b3;
  }
`;

export const BlankPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
`;
