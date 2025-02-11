import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  height: 5em;
  width: auto;
`;

export const Input = styled.input`
  border-radius: 5px;
  padding: 1em;
  width: 100%;  
 
  &::placeholder {
    color: black;
    opacity: 0.6;
  }
  &:focus {
      outline: none;
      border-color: none;
    }
  
`;