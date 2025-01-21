import styled from 'styled-components';
import {Button} from '../../OrangeButton/styles'

export const Container = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  height: 5em;
  width: auto;
  margin-top: 1em;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: #F6821F;
  margin-left: 1em;
`;

export const InputPhone = styled.input`
  border: 1.3px solid #F6821F;
  border-radius: 10px;
  padding: 0.7em;
  width: 100%;
 
  &::placeholder {
    color: #F6821F;
    content: "(81) ____-____";
  }
  
`;

export const ButtonSubumit = styled(Button)`
  height:100px;
  width: 100%;
  margin: 0;
  margin-top: 0.8em;
  border-radius: 10px;
  font-size: 1rem;
  padding: 0.5em;
  background-color: #F6821F;
  `;