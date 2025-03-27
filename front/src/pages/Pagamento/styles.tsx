import styled from 'styled-components';

export const OpenButton = styled.button`
  &:hover {
    background-color: #0056b3;
  };
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1.1em;
  margin-top: 20px;
  padding: 10px 20px;
`;

export const BlankPageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 100vw;
`;
