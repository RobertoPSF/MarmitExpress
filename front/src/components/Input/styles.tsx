import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const Div = styled.div`
  display: flex;
  color: #f6821f;
  font-weight: bold;
  font-size: small;
`;

export const ContainerInput = styled.div`
  width: 100%;
  display: block;
  border: 1px solid #f6821f;
  border-radius: 10px;
  width: 100%;

  &::placeholder {
    font-weight: 700;
  }
`;

export const InputStyled = styled.input`
  width: 100%;
  height: 6vh;
  padding: 0 1.5vw;
  font-size: 1em;
  line-height: 2vh;
  color: #ff9b3f;
  border-radius: 10px;
  border: #ffe6cf;
  outline: none;
  caret-color: #db5807;

  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }

  &:disabled {
  }

  &::placeholder {
    color: #ffb876;
  }
`;
