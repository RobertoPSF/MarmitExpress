import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const Div = styled.div`
  display: flex;
  color: #F6821F;
  font-weight: bold;
  font-size: small;
`;


export const ContainerInput = styled.div`
  width: 100%;
  display: block;
  border: 1px solid #F6821F;
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
  color: #FF9B3F;
  border-radius: 10px;
  border: #FFE6CF;
  outline: none;
  caret-color: #DB5807;

  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }

  &:disabled {
  }

  &::placeholder {
    color: #FFB876;
  }

`;