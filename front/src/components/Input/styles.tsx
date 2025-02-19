import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const Div = styled.div`
  color: #f6821f;
  display: flex;
  font-size: small;
  font-weight: bold;
`;

export const ContainerInput = styled.div`
  &::placeholder {
    font-weight: 700;
  }
  border: 1px solid #f6821f;
  border-radius: 10px;
  display: block;
  width: 100%;
  width: 100%;
`;

export const InputStyled = styled.input`
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
  border: #ffe6cf;
  border-radius: 10px;
  caret-color: #db5807;
  color: #ff9b3f;
  font-size: 1em;
  height: 6vh;
  line-height: 2vh;
  outline: none;
  padding: 0 1.5vw;
  width: 100%;
`;
