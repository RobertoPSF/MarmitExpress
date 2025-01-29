import styled from 'styled-components';
import { Button } from '../ButtonComponent/styles';
import { Input } from '../InputComponent/styles';

//Não sei add de outra forma pq não tem como usar o container pq tá em popup default e não pode mudar lá. Muda dps pfv
// e não sei redefinir o tamanho do container sem mudar lá no popup default tbm então se puder mudar isso tbm pfv para deixar mais fino e mais alto 
//Ingual o do Figma :)

export const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  margin-top:2rem;
`; 

export const Text = styled.p`
  font-size: 1rem;
  color: black;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  width: 100%;
`;

export const TelefoneName = styled.p`
  font-size: 0.9em;
  color: #F6821F;
  font-weight: 600;
  margin-right: 25rem;
  width: 100%;
`;

export const InputPhone = styled(Input)`
  border: 1.3px solid #F6821F;
  border-radius: 10px;
  padding: 0.7em;
  width: 100%;

  &::placeholder {
    color: #F6821F;
    font-weight: 700;
  }
`;

export const ButtonSubumit = styled(Button)`
  height: 2.7rem;
  width: 100%;
  margin: 0;
  margin-top: 0.8em;
  border-radius: 10px;
  font-size: 1rem;
  padding: 0.5em;
  background-color: #F6821F;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  `;